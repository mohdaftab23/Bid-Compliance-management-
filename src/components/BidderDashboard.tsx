import React, { useState } from 'react';
import {
  Search,
  Building,
  FileCheck,
  ArrowRight,
  Shield,
  Clock,
  CheckCircle2,
  AlertOctagon,
  Trash2,
  Eye,
  Edit,
  RotateCcw,
  IndianRupee,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { Tender, Bidder, BidderStatus } from '../types';
import { formatINR, formatIndianDate } from '../utils/indianFormat';

interface BidderDashboardProps {
  tenders: Tender[];
  bidders: Bidder[];
  currentBidder?: Bidder | null;
  onNavigate: (view: string) => void;
  onSelectTender: (tender: Tender) => void;
  onUpdateBidder: (updated: Bidder) => void;
  onDeleteDraft?: (bidderId: string) => void;
}

export const BidderDashboard: React.FC<BidderDashboardProps> = ({
  tenders,
  bidders,
  currentBidder,
  onNavigate,
  onSelectTender,
  onUpdateBidder,
  onDeleteDraft,
}) => {
  const [withdrawModalBidder, setWithdrawModalBidder] = useState<Bidder | null>(null);
  const [withdrawalReason, setWithdrawalReason] = useState<string>('');
  const [deleteDraftModal, setDeleteDraftModal] = useState<Bidder | null>(null);

  const bidderApplications = (currentBidder
    ? bidders.filter((b) => b && (b.companyName === currentBidder.companyName || (currentBidder.id && b.id === currentBidder.id)))
    : bidders).filter((b): b is Bidder => Boolean(b && b.id));

  const getStatusBadge = (status?: BidderStatus) => {
    switch (status) {
      case 'DRAFT':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
            DRAFT
          </span>
        );
      case 'SUBMITTED':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
            SUBMITTED
          </span>
        );
      case 'UNDER REVIEW':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            UNDER REVIEW
          </span>
        );
      case 'WITHDRAWN':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
            WITHDRAWN
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
            SUBMITTED
          </span>
        );
    }
  };

  const handleConfirmWithdraw = () => {
    if (withdrawModalBidder) {
      const updated: Bidder = {
        ...withdrawModalBidder,
        status: 'WITHDRAWN',
        withdrawnAt: new Date().toISOString(),
        withdrawalReason: withdrawalReason.trim() || 'Withdrawn by bidder prior to final award.',
      };
      onUpdateBidder(updated);
    }
    setWithdrawModalBidder(null);
    setWithdrawalReason('');
  };

  const handleConfirmDeleteDraft = () => {
    if (deleteDraftModal?.id && onDeleteDraft) {
      onDeleteDraft(deleteDraftModal.id);
    }
    setDeleteDraftModal(null);
  };

  const draftApp = bidderApplications.find((b) => b.status === 'DRAFT');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-400 mb-1">
            <Building className="w-4 h-4 text-blue-900 dark:text-blue-400" />
            <span>Government Vendor Portal &bull; GeM & e-Procure</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Bidder Dashboard
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Registered Vendor: <strong className="text-slate-900 dark:text-slate-200">{currentBidder?.companyName || 'Registered Enterprise'}</strong> (GSTIN: {currentBidder?.gstin || '07AABCA1234F1Z5'})
          </p>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-3 py-2 rounded-lg text-xs text-blue-950 dark:text-blue-200">
          <Clock className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0" />
          <span>
            <strong>Next Step:</strong> {draftApp ? 'You have an unfinished bid draft waiting.' : 'Explore published notices and submit your proposal.'}
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* THREE PRIMARY ACTIONS (REQUIREMENT 3: BIDDER HOME DASHBOARD)               */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Action 1: Find Tenders */}
        <button
          type="button"
          onClick={() => onNavigate('find-tenders')}
          className="bg-white dark:bg-slate-900 hover:bg-blue-50/60 dark:hover:bg-blue-950/30 border-2 border-slate-200 dark:border-slate-800 hover:border-blue-900 dark:hover:border-blue-500 rounded-xl p-5 text-left transition-all shadow-xs group flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900 dark:bg-blue-700 text-white flex items-center justify-center font-bold shadow-xs">
              <Search className="w-5 h-5 text-blue-200" />
            </div>
            <span className="text-[11px] font-bold text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
              {tenders.length} Active
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors">
              Find Tenders
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Search open municipal contracts, road maintenance, and smart utility works.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1 text-xs font-semibold text-blue-900 dark:text-blue-400">
            <span>Browse Opportunities</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>

        {/* Action 2: My Applications */}
        <button
          type="button"
          onClick={() => onNavigate('submissions')}
          className="bg-white dark:bg-slate-900 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/30 border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-700 dark:hover:border-emerald-500 rounded-xl p-5 text-left transition-all shadow-xs group flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 dark:bg-emerald-700 text-white flex items-center justify-center font-bold shadow-xs">
              <FileCheck className="w-5 h-5 text-emerald-200" />
            </div>
            <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
              {bidderApplications.length} Records
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
              My Applications
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Check submission status, compliance verification results, and audit trails.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1 text-xs font-semibold text-emerald-800 dark:text-emerald-400">
            <span>View Submissions</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>

        {/* Action 3: Continue Draft */}
        <button
          type="button"
          onClick={() => onNavigate('submissions')}
          className="bg-white dark:bg-slate-900 hover:bg-amber-50/60 dark:hover:bg-amber-950/30 border-2 border-slate-200 dark:border-slate-800 hover:border-amber-700 dark:hover:border-amber-500 rounded-xl p-5 text-left transition-all shadow-xs group flex flex-col justify-between cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-700 dark:bg-amber-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Edit className="w-5 h-5 text-amber-200" />
            </div>
            <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
              {draftApp ? 'Draft Pending' : 'Ready'}
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
              Continue Draft
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Resume your proposal with text, voice transcript, or certificate uploads.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1 text-xs font-semibold text-amber-800 dark:text-amber-400">
            <span>Resume Work</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MY APPLICATIONS SECTION                                                   */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden transition-colors">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-800/40">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">My Applications</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              History of bids submitted by {currentBidder?.companyName || 'your organization'}.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="px-4 py-3">Tender</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Bid Amount</th>
                <th className="px-4 py-3">Last Updated</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {bidderApplications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400 text-xs">
                    No applications submitted yet. Browse open tenders to prepare your first bid.
                  </td>
                </tr>
              ) : (
                bidderApplications.map((b) => {
                  const tenderMatch = tenders.find((t) => t && t.id === b.tenderId) || (tenders.length > 0 ? tenders[0] : null);
                  const status = b.status || 'SUBMITTED';
                  const isDraft = status === 'DRAFT';
                  const isSubmitted = status === 'SUBMITTED' || status === 'UNDER REVIEW';
                  const isWithdrawn = status === 'WITHDRAWN';

                  return (
                    <tr key={b.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                      {/* Tender Title */}
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-slate-900 dark:text-slate-100 text-xs">
                          {tenderMatch?.title || 'Public Tender Notice'}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                          Notice #{tenderMatch?.referenceNumber || b.tenderId} • {tenderMatch?.department || 'Procurement Authority'}
                        </div>
                      {b.withdrawalReason && (
                        <div className="text-[10px] text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-800 mt-1 inline-block">
                          Withdrawn: "{b.withdrawalReason}"
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {getStatusBadge(status)}
                    </td>

                    {/* Bid Amount */}
                    <td className="px-4 py-3.5 whitespace-nowrap font-bold text-blue-950 dark:text-blue-300">
                      {formatINR(b.proposal?.pricingTotal || 17800000)}
                    </td>

                    {/* Last Updated */}
                    <td className="px-4 py-3.5 whitespace-nowrap text-slate-700 dark:text-slate-300 font-medium">
                      {formatIndianDate(b.submittedAt || new Date().toISOString())}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* If DRAFT: Continue, Delete Draft */}
                        {isDraft && (
                          <>
                            <button
                              type="button"
                              onClick={() => onNavigate('submissions')}
                              className="px-2.5 py-1 rounded bg-blue-900 dark:bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-600 text-white font-semibold text-xs transition-colors cursor-pointer"
                            >
                              Continue
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteDraftModal(b)}
                              className="px-2.5 py-1 rounded bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-semibold text-xs transition-colors cursor-pointer"
                            >
                              Delete Draft
                            </button>
                          </>
                        )}

                        {/* If SUBMITTED / UNDER REVIEW: View, Withdraw Bid */}
                        {isSubmitted && (
                          <>
                            <button
                              type="button"
                              onClick={() => onNavigate('submissions')}
                              className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3 h-3" />
                              <span>View</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setWithdrawModalBidder(b);
                                setWithdrawalReason('');
                              }}
                              className="px-2.5 py-1 rounded bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-semibold text-xs transition-colors cursor-pointer"
                              title="Withdraw submitted bid"
                            >
                              Withdraw Bid
                            </button>
                          </>
                        )}

                        {/* If WITHDRAWN */}
                        {isWithdrawn && (
                          <span className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                            Withdrawn
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              }))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* WITHDRAW BID CONFIRMATION MODAL (REQUIREMENT 2)                           */}
      {/* ========================================================================= */}
      {withdrawModalBidder && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-md w-full p-5 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-400 flex items-center justify-center shrink-0">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Withdraw this bid?</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Applicant: {withdrawModalBidder.companyName}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              After withdrawal, your bid will no longer be considered in this tender, subject to the applicable tender rules and EMD conditions.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Optional reason for withdrawal:
              </label>
              <textarea
                rows={3}
                value={withdrawalReason}
                onChange={(e) => setWithdrawalReason(e.target.value)}
                placeholder="e.g. Inability to mobilize specified fleet within deadline..."
                className="w-full p-2.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-900 dark:focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setWithdrawModalBidder(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                Keep Submission
              </button>
              <button
                type="button"
                onClick={handleConfirmWithdraw}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Withdraw Bid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE DRAFT MODAL */}
      {deleteDraftModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-md w-full p-5 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-400 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Delete this draft bid?</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Unsubmitted application</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              This will permanently delete your unfinished bid draft and uploaded temporary files.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteDraftModal(null)}
                className="px-3.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                Keep Draft
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteDraft}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                Delete Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

