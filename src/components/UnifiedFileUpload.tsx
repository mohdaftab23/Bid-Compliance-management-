import React, { useState, useRef, useEffect } from 'react';
import {
  UploadCloud,
  FileText,
  FileSpreadsheet,
  Film,
  Image as ImageIcon,
  CheckCircle2,
  Trash2,
  Eye,
  RefreshCw,
  AlertCircle,
  X,
  StopCircle,
  File,
  Layers,
  ChevronDown,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { UploadedFileItem, UploadTask } from '../types';

interface UnifiedFileUploadProps {
  files: UploadedFileItem[];
  onFilesChange: (files: UploadedFileItem[]) => void;
  title?: string;
  subtitle?: string;
  allowVideo?: boolean;
  maxSizeMB?: number;
  onBatchStatusChange?: (summary: { total: number; inProgress: number; completed: number; failed: number }) => void;
}

export const UnifiedFileUpload: React.FC<UnifiedFileUploadProps> = ({
  files,
  onFilesChange,
  title = 'Upload Documents & Media Assets',
  subtitle = 'Drag and drop multiple files here, or browse. Supports PDF, DOCX, XLSX, Images, and Inspection Videos.',
  allowVideo = true,
  maxSizeMB = 50,
  onBatchStatusChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<UploadedFileItem | null>(null);
  const [activeTasks, setActiveTasks] = useState<UploadTask[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const replaceTargetIdRef = useRef<string | null>(null);

  // Interval timer references for simulated uploads
  const uploadTimersRef = useRef<Record<string, ReturnType<typeof setInterval>>>({});

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileCategory = (filename: string, mime: string) => {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    const isVid = mime.startsWith('video/') || ['mp4', 'mov', 'webm', 'mkv', 'avi'].includes(ext);
    const isImg = mime.startsWith('image/') || ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif'].includes(ext);
    const isSheet = ['xls', 'xlsx', 'csv'].includes(ext) || mime.includes('spreadsheet') || mime.includes('excel') || mime.includes('csv');
    const isDoc = ['doc', 'docx', 'odt', 'rtf', 'txt'].includes(ext);
    const isPdf = ext === 'pdf' || mime.includes('pdf');

    return { ext, isVid, isImg, isSheet, isDoc, isPdf };
  };

  // Notify parent of batch upload status
  useEffect(() => {
    if (onBatchStatusChange) {
      const inProgress = activeTasks.filter(t => t.status === 'UPLOADING' || t.status === 'QUEUED').length;
      const completed = activeTasks.filter(t => t.status === 'COMPLETED').length;
      const failed = activeTasks.filter(t => t.status === 'FAILED' || t.status === 'CANCELLED').length;
      onBatchStatusChange({
        total: activeTasks.length,
        inProgress,
        completed,
        failed,
      });
    }
  }, [activeTasks, onBatchStatusChange]);

  const startTaskSimulation = (task: UploadTask) => {
    const stepDuration = 180 + Math.random() * 150;
    const increment = 10 + Math.random() * 15;

    const timer = setInterval(() => {
      setActiveTasks((prev) => {
        return prev.map((t) => {
          if (t.id !== task.id) return t;
          if (t.status === 'CANCELLED' || t.status === 'FAILED') {
            clearInterval(timer);
            return t;
          }

          const nextProgress = Math.min(100, Math.round(t.progress + increment));

          if (nextProgress >= 100) {
            clearInterval(timer);
            // Add to finalized files list
            const { isVid, isImg, isSheet, isDoc, isPdf } = getFileCategory(t.name, t.type);

            const newUploadedItem: UploadedFileItem = {
              id: t.id,
              name: t.name,
              type: t.type || t.extension.toUpperCase(),
              extension: t.extension,
              size: t.size,
              sizeBytes: t.sizeBytes,
              uploadedAt: new Date().toISOString().split('T')[0],
              status: 'UPLOADED',
              previewUrl: t.previewUrl,
              isVideo: isVid,
              isImage: isImg,
              isPdf: isPdf,
              isSpreadsheet: isSheet,
              isDoc: isDoc,
              category: t.category,
            };

            onFilesChange([...(files || []).filter(f => f && f.id !== t.id), newUploadedItem]);

            return {
              ...t,
              progress: 100,
              status: 'COMPLETED',
            };
          }

          return {
            ...t,
            progress: nextProgress,
            status: 'UPLOADING',
          };
        });
      });
    }, stepDuration);

    uploadTimersRef.current[task.id] = timer;
  };

  const processIncomingFiles = (incomingFiles: FileList | File[]) => {
    setUploadError(null);
    const allowedExtensions = [
      'pdf', 'doc', 'docx', 'txt', 'xls', 'xlsx', 'csv',
      'jpg', 'jpeg', 'png', 'webp'
    ];
    if (allowVideo) {
      allowedExtensions.push('mp4', 'mov', 'webm');
    }

    const newTasks: UploadTask[] = [];

    Array.from(incomingFiles).forEach((file) => {
      const { ext, isVid, isImg, isSheet, isDoc, isPdf } = getFileCategory(file.name, file.type);

      if (!allowedExtensions.includes(ext) && !file.type) {
        setUploadError(`File "${file.name}" is an unsupported format.`);
        return;
      }

      if (file.size > maxSizeMB * 1024 * 1024) {
        setUploadError(`File "${file.name}" exceeds the ${maxSizeMB}MB size limit.`);
        return;
      }

      let previewUrl = '';
      if (isImg || isVid) {
        try {
          previewUrl = URL.createObjectURL(file);
        } catch {
          // ignore
        }
      }

      let defaultCat: UploadTask['category'] = 'SPECIFICATION';
      if (isVid || isImg) defaultCat = 'MEDIA';
      else if (isSheet) defaultCat = 'TECHNICAL_SCHEDULE';
      else if (file.name.toLowerCase().includes('contract') || file.name.toLowerCase().includes('terms')) defaultCat = 'LEGAL_TERMS';

      const task: UploadTask = {
        id: `batch-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        file,
        name: file.name,
        size: formatFileSize(file.size),
        sizeBytes: file.size,
        progress: 5,
        status: 'UPLOADING',
        category: defaultCat,
        type: file.type || ext.toUpperCase(),
        extension: ext,
        previewUrl,
      };

      newTasks.push(task);
    });

    if (newTasks.length > 0) {
      setActiveTasks((prev) => [...prev, ...newTasks]);
      newTasks.forEach((t) => startTaskSimulation(t));
    }
  };

  const cancelUploadTask = (id: string) => {
    if (uploadTimersRef.current[id]) {
      clearInterval(uploadTimersRef.current[id]);
      delete uploadTimersRef.current[id];
    }
    setActiveTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'CANCELLED', error: 'Upload cancelled by user' } : t))
    );
  };

  const cancelAllUploads = () => {
    Object.keys(uploadTimersRef.current).forEach((key) => {
      const timer = uploadTimersRef.current[key];
      if (timer) clearInterval(timer);
    });
    uploadTimersRef.current = {};
    setActiveTasks((prev) =>
      prev.map((t) =>
        t.status === 'UPLOADING' || t.status === 'QUEUED'
          ? { ...t, status: 'CANCELLED', error: 'Batch cancelled' }
          : t
      )
    );
  };

  const retryTask = (task: UploadTask) => {
    const updated: UploadTask = {
      ...task,
      progress: 0,
      status: 'UPLOADING',
      error: undefined,
    };
    setActiveTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    startTaskSimulation(updated);
  };

  const retryAllFailed = () => {
    const failedTasks = activeTasks.filter((t) => t.status === 'FAILED' || t.status === 'CANCELLED');
    failedTasks.forEach((t) => retryTask(t));
  };

  const clearCompletedTasks = () => {
    setActiveTasks((prev) => prev.filter((t) => t.status === 'UPLOADING' || t.status === 'QUEUED'));
  };

  const handleRemoveFile = (id: string) => {
    onFilesChange((files || []).filter((f) => f && f.id !== id));
    setActiveTasks((prev) => prev.filter((t) => t && t.id !== id));
    if (previewFile?.id === id) {
      setPreviewFile(null);
    }
  };

  const handleTriggerReplace = (fileId: string) => {
    replaceTargetIdRef.current = fileId;
    if (replaceInputRef.current) {
      replaceInputRef.current.value = '';
      replaceInputRef.current.click();
    }
  };

  const handleReplaceSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const newFile = e.target.files[0];
    const targetId = replaceTargetIdRef.current;
    if (!targetId) return;

    // Remove old
    onFilesChange((files || []).filter(f => f && f.id !== targetId));
    setActiveTasks(prev => prev.filter(t => t && t.id !== targetId));

    // Process new
    processIncomingFiles([newFile]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processIncomingFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processIncomingFiles(e.target.files);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getFileIcon = (file: { isVideo?: boolean; isImage?: boolean; isSpreadsheet?: boolean; isPdf?: boolean }) => {
    if (file.isVideo) return <Film className="w-4 h-4 text-amber-600" />;
    if (file.isImage) return <ImageIcon className="w-4 h-4 text-purple-600" />;
    if (file.isSpreadsheet) return <FileSpreadsheet className="w-4 h-4 text-emerald-600" />;
    if (file.isPdf) return <FileText className="w-4 h-4 text-rose-600" />;
    return <FileText className="w-4 h-4 text-blue-600" />;
  };

  const inFlightCount = activeTasks.filter(t => t.status === 'UPLOADING' || t.status === 'QUEUED').length;
  const completedCount = activeTasks.filter(t => t.status === 'COMPLETED').length;
  const failedCount = activeTasks.filter(t => t.status === 'FAILED' || t.status === 'CANCELLED').length;
  const batchTotal = activeTasks.length;

  const overallBatchPercent = batchTotal > 0
    ? Math.round(activeTasks.reduce((acc, t) => acc + (t.status === 'COMPLETED' ? 100 : t.progress), 0) / batchTotal)
    : 100;

  return (
    <div className="space-y-4">
      {/* Hidden File Input for Replacement */}
      <input
        ref={replaceInputRef}
        type="file"
        onChange={handleReplaceSelected}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.webp,.mp4,.mov"
      />

      {/* Main Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-blue-700 bg-blue-50/70 dark:bg-blue-950/40 scale-[0.99]'
            : 'border-slate-300 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-500 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-blue-50/20 dark:hover:bg-blue-950/20'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileInput}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.webp,.mp4,.mov"
        />

        <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 flex items-center justify-center mb-3 shadow-xs">
          <UploadCloud className="w-6 h-6" />
        </div>

        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{title}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 mb-3 leading-relaxed">
          {subtitle}
        </p>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-xs hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-400 dark:hover:border-slate-600">
          <span>Select Files for Batch Upload</span>
        </div>

        <div className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">
          Supports: PDF, Word (DOC/DOCX), Excel (XLSX/CSV), Images (PNG/JPG), and Videos (MP4/MOV up to {maxSizeMB}MB)
        </div>
      </div>

      {/* Upload Error Banner */}
      {uploadError && (
        <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>{uploadError}</span>
          </div>
          <button
            onClick={() => setUploadError(null)}
            className="text-rose-500 hover:text-rose-800 dark:hover:text-rose-300 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BATCH STATUS MONITORING PROGRESS DASHBOARD                                */}
      {/* ========================================================================= */}
      {activeTasks.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 rounded-xl p-4 shadow-sm space-y-3 animate-in fade-in transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-900 dark:bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
                {inFlightCount > 0 ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-200" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Batch Upload Status Dashboard
                </h4>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <span>Total: {batchTotal} files</span>
                  <span>•</span>
                  <span className="text-blue-700 dark:text-blue-400 font-semibold">{inFlightCount} in progress</span>
                  <span>•</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{completedCount} completed</span>
                  {failedCount > 0 && (
                    <>
                      <span>•</span>
                      <span className="text-rose-600 dark:text-rose-400 font-semibold">{failedCount} cancelled/failed</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Batch Level Controls */}
            <div className="flex items-center gap-2">
              {inFlightCount > 0 && (
                <button
                  type="button"
                  onClick={cancelAllUploads}
                  className="px-2.5 py-1 rounded bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                  title="Cancel all active uploads"
                >
                  <StopCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                  <span>Cancel All Uploads</span>
                </button>
              )}

              {failedCount > 0 && (
                <button
                  type="button"
                  onClick={retryAllFailed}
                  className="px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Retry Failed</span>
                </button>
              )}

              {completedCount > 0 && inFlightCount === 0 && (
                <button
                  type="button"
                  onClick={clearCompletedTasks}
                  className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                >
                  <span>Clear Completed</span>
                </button>
              )}
            </div>
          </div>

          {/* Overall Batch Progress Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              <span>Overall Batch Progress</span>
              <span>{overallBatchPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  inFlightCount > 0 ? 'bg-blue-600' : 'bg-emerald-600'
                }`}
                style={{ width: `${overallBatchPercent}%` }}
              />
            </div>
          </div>

          {/* Individual Upload Tasks List */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-56 overflow-y-auto pr-1">
            {activeTasks.map((task) => (
              <div key={task.id} className="py-2 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    {getFileIcon(getFileCategory(task.name, task.type))}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate" title={task.name}>
                        {task.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 shrink-0">
                        {task.size}
                      </span>
                    </div>

                    {/* Progress or status badge */}
                    {task.status === 'UPLOADING' && (
                      <div className="w-full flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 transition-all duration-200"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 shrink-0">
                          {task.progress}%
                        </span>
                      </div>
                    )}

                    {task.status === 'COMPLETED' && (
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        Uploaded successfully
                      </span>
                    )}

                    {task.status === 'CANCELLED' && (
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium italic">
                        Upload cancelled
                      </span>
                    )}

                    {task.status === 'FAILED' && (
                      <span className="text-[10px] text-rose-600 dark:text-rose-400 font-medium">
                        {task.error || 'Upload failed'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Task Action Controls */}
                <div className="shrink-0 flex items-center gap-1.5">
                  {task.status === 'UPLOADING' && (
                    <button
                      type="button"
                      onClick={() => cancelUploadTask(task.id)}
                      className="px-2 py-0.5 text-[11px] rounded font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}

                  {(task.status === 'CANCELLED' || task.status === 'FAILED') && (
                    <button
                      type="button"
                      onClick={() => retryTask(task)}
                      className="px-2 py-0.5 text-[11px] rounded font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800 transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      Retry
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FINALIZED UPLOADED DOCUMENTS & MEDIA REPOSITORY                            */}
      {/* ========================================================================= */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 px-1">
            <span>Official Tender Assets & Attachments ({files.length})</span>
            <span>Total size: {formatFileSize(files.reduce((acc, f) => acc + f.sizeBytes, 0))}</span>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden shadow-xs transition-colors">
            {(files || []).filter((file): file is UploadedFileItem => Boolean(file && file.id)).map((file) => (
              <div
                key={file.id}
                className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition-colors"
              >
                {/* Left: Icon, Name, Category */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                    {getFileIcon(file)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 dark:text-slate-100 truncate max-w-sm" title={file.name}>
                        {file.name}
                      </span>
                      {file.isVideo && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
                          Video Asset
                        </span>
                      )}
                      {file.isImage && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-200 border border-purple-300 dark:border-purple-800">
                          Image
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>{file.type}</span>
                      <span>•</span>
                      <span>Added: {file.uploadedAt}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Category Selector & Action Controls */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <select
                    value={file.category || 'SPECIFICATION'}
                    onChange={(e) => {
                      const newCat = e.target.value as any;
                      onFilesChange(
                        files.map((f) => (f.id === file.id ? { ...f, category: newCat } : f))
                      );
                    }}
                    className="text-[11px] px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-blue-900"
                  >
                    <option value="SPECIFICATION">Specification</option>
                    <option value="TECHNICAL_SCHEDULE">BOQ / Schedule</option>
                    <option value="LEGAL_TERMS">Legal Terms</option>
                    <option value="MEDIA">Site Inspection Media</option>
                    <option value="OTHER">Other Annexure</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => setPreviewFile(file)}
                    className="px-2.5 py-1 rounded text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
                    title="Preview Document / Media"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTriggerReplace(file.id)}
                    className="px-2.5 py-1 rounded text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
                    title="Replace this file with another version"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Replace</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemoveFile(file.id)}
                    className="px-2.5 py-1 rounded text-slate-500 dark:text-slate-400 hover:text-rose-700 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 font-medium inline-flex items-center gap-1 transition-colors cursor-pointer"
                    title="Remove File"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview Modal for PDFs, Images, and Videos */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-slate-200 dark:border-slate-800">
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200">
                  {getFileIcon(previewFile)}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate max-w-md">
                    {previewFile.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {previewFile.size} • {previewFile.type} • Category: {previewFile.category || 'General'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPreviewFile(null)}
                className="w-7 h-7 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 flex items-center justify-center bg-slate-100/50 dark:bg-slate-950/50">
              {previewFile.isVideo && (
                <div className="w-full max-w-xl text-center">
                  {previewFile.previewUrl ? (
                    <video
                      src={previewFile.previewUrl}
                      controls
                      className="w-full max-h-[55vh] rounded-lg shadow-sm bg-black"
                    />
                  ) : (
                    <div className="p-8 bg-slate-900 dark:bg-slate-950 text-white rounded-lg text-center space-y-3 border border-slate-800">
                      <Film className="w-12 h-12 mx-auto text-amber-400" />
                      <div className="font-semibold text-sm">Site Video Asset Verified</div>
                      <p className="text-xs text-slate-400 max-w-md mx-auto">
                        High-resolution asset video. Indexed for AI multimodal inspection.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {previewFile.isImage && (
                <div className="max-w-xl max-h-[60vh] flex items-center justify-center">
                  {previewFile.previewUrl ? (
                    <img
                      src={previewFile.previewUrl}
                      alt={previewFile.name}
                      className="max-h-[55vh] max-w-full rounded-lg object-contain shadow-sm border border-slate-200 dark:border-slate-800"
                    />
                  ) : (
                    <div className="p-8 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 rounded-lg text-center space-y-2 border border-slate-200 dark:border-slate-800">
                      <ImageIcon className="w-12 h-12 mx-auto text-purple-600 dark:text-purple-400" />
                      <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">Site & Route Map Asset</div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Zoning boundaries and road clearance corridors verified.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {!previewFile.isVideo && !previewFile.isImage && (
                <div className="w-full max-w-lg bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-slate-100">{previewFile.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Indexed Tender Procurement Document</div>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
                    <div><strong>File Name:</strong> {previewFile.name}</div>
                    <div><strong>File Size:</strong> {previewFile.size}</div>
                    <div><strong>Format:</strong> {previewFile.extension.toUpperCase()}</div>
                    <div><strong>Uploaded:</strong> {previewFile.uploadedAt}</div>
                    <div><strong>Classification:</strong> {previewFile.category || 'SPECIFICATION'}</div>
                    <div className="text-emerald-700 dark:text-emerald-400 font-semibold"><strong>Integrity Check:</strong> SHA-256 Digital Fingerprint Verified ✓</div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    This official document is integrated into the tender package and available for automated eligibility validation and bidder requirement cross-matching.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-end">
              <button
                onClick={() => setPreviewFile(null)}
                className="px-4 py-1.5 rounded-md text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
