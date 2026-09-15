import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square, RefreshCw, Check, Trash2, Edit3, Volume2, AlertCircle, Sparkles, Loader2 } from 'lucide-react';
import { defaultSTTProvider, STTState, STTLanguage } from '../services/speechToTextProvider';

interface SpeechToTextRecorderProps {
  onUseTranscript: (text: string) => void;
  onOrganizeWithAI?: (transcript: string) => void;
  label?: string;
  placeholder?: string;
  isOrganizing?: boolean;
}

export const SpeechToTextRecorder: React.FC<SpeechToTextRecorderProps> = ({
  onUseTranscript,
  onOrganizeWithAI,
  label = 'Voice Input (Speech-to-Text)',
  placeholder = 'Speak your requirements or proposal details clearly into your microphone...',
  isOrganizing = false,
}) => {
  const [sttState, setSttState] = useState<STTState>('idle');
  const [liveInterim, setLiveInterim] = useState('');
  const [transcript, setTranscript] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTranscript, setEditedTranscript] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [language, setLanguage] = useState<STTLanguage>('en-IN');

  useEffect(() => {
    return () => {
      defaultSTTProvider.cancel();
    };
  }, []);

  const handleLanguageChange = (lang: STTLanguage) => {
    setLanguage(lang);
    defaultSTTProvider.setLanguage(lang);
  };

  const startListening = async () => {
    setErrorMessage(null);
    setLiveInterim('');
    defaultSTTProvider.setLanguage(language);

    try {
      await defaultSTTProvider.start({
        onInterimTranscript: (interim) => {
          setLiveInterim(interim);
        },
        onFinalTranscript: (final) => {
          setTranscript(final);
          setEditedTranscript(final);
        },
        onStateChange: (state) => {
          setSttState(state);
        },
        onError: (err) => {
          setErrorMessage(err);
          setSttState('error');
        },
      });
    } catch (err: any) {
      setErrorMessage(err?.message || 'Unable to access microphone.');
      setSttState('error');
    }
  };

  const stopListening = async () => {
    try {
      const captured = await defaultSTTProvider.stop();
      if (captured) {
        setTranscript(captured);
        setEditedTranscript(captured);
      }
      setLiveInterim('');
      setSttState('completed');
    } catch (err) {
      setSttState('idle');
    }
  };

  const handleUseThis = () => {
    const textToUse = isEditing ? editedTranscript : transcript;
    if (textToUse.trim()) {
      onUseTranscript(textToUse.trim());
    }
  };

  const handleClear = () => {
    defaultSTTProvider.cancel();
    setTranscript('');
    setEditedTranscript('');
    setLiveInterim('');
    setIsEditing(false);
    setSttState('idle');
  };

  const isRecording = sttState === 'recording';
  const isProcessing = sttState === 'processing';
  const activeTranscript = isEditing ? editedTranscript : transcript;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/70 text-blue-900 dark:text-blue-300 flex items-center justify-center font-bold">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{label}</span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Speak naturally. Raw transcription will be displayed for your review.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value as STTLanguage)}
            className="text-[11px] px-2 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium focus:outline-none"
            disabled={isRecording}
          >
            <option value="en-IN">Indian English (en-IN)</option>
            <option value="hi-IN">Hindi / Hinglish (hi-IN)</option>
          </select>

          {!isRecording ? (
            <button
              type="button"
              onClick={startListening}
              disabled={isProcessing}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-900 dark:bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-600 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Mic className="w-3.5 h-3.5 text-blue-200" />
              <span>Record Voice</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={stopListening}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow-xs animate-pulse transition-colors cursor-pointer"
            >
              <Square className="w-3.5 h-3.5" />
              <span>Stop Recording</span>
            </button>
          )}
        </div>
      </div>

      {/* Recording State indicator */}
      {isRecording && (
        <div className="p-3 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
            </span>
            <span className="text-xs font-bold text-blue-900 dark:text-blue-200">Listening...</span>
            <span className="text-xs text-slate-600 dark:text-slate-300 italic">
              {liveInterim || placeholder}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="w-1 h-3 bg-blue-600 dark:bg-blue-400 animate-pulse rounded-full"></span>
            <span className="w-1 h-5 bg-blue-700 dark:bg-blue-500 animate-pulse delay-75 rounded-full"></span>
            <span className="w-1 h-4 bg-blue-600 dark:bg-blue-400 animate-pulse delay-150 rounded-full"></span>
            <span className="w-1 h-6 bg-blue-800 dark:bg-blue-600 animate-pulse delay-100 rounded-full"></span>
          </div>
        </div>
      )}

      {/* Processing State */}
      {isProcessing && (
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200">
          <Loader2 className="w-4 h-4 animate-spin text-blue-900 dark:text-blue-400" />
          <span>Converting speech to text...</span>
        </div>
      )}

      {/* Error notice if mic was denied */}
      {errorMessage && (
        <div className="p-3 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded-lg text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold block">Microphone Notice</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Raw Voice Transcript Display */}
      {transcript && (
        <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg p-3 space-y-2.5 animate-in fade-in transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-blue-800 dark:text-blue-400" />
              Raw Transcription
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-300 px-2 py-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 inline-flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                {isEditing ? 'Done Editing' : 'Edit'}
              </button>
              <button
                type="button"
                onClick={startListening}
                className="text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-300 px-2 py-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-700 inline-flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                Record Again
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="text-[11px] font-medium text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300 px-2 py-0.5 rounded hover:bg-rose-50 dark:hover:bg-rose-950/60 inline-flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                Delete
              </button>
            </div>
          </div>

          {isEditing ? (
            <textarea
              rows={3}
              value={editedTranscript}
              onChange={(e) => setEditedTranscript(e.target.value)}
              className="w-full text-xs font-sans p-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded focus:outline-none focus:ring-1 focus:ring-blue-900 dark:focus:ring-blue-500 text-slate-800 dark:text-slate-100"
            />
          ) : (
            <div className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
              "{transcript}"
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-700">
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Raw transcript preserved. Choose an action below:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleUseThis}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-md text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>Use This</span>
              </button>

              {onOrganizeWithAI && (
                <button
                  type="button"
                  onClick={() => onOrganizeWithAI(activeTranscript)}
                  disabled={isOrganizing || !activeTranscript.trim()}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-900 dark:bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-600 disabled:opacity-50 text-white rounded-md text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  {isOrganizing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Organizing with AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-blue-300" />
                      <span>Organize with AI</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
