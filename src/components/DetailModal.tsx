import React from 'react';
import { DetailData } from '@/types';

interface DetailModalProps {
  data: DetailData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DetailModal({ data, isOpen, onClose }: DetailModalProps) {
  if (!isOpen || !data) return null;

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    if (status === 'Official') return 'text-blue-400';
    if (status === 'Updated') return 'text-green-400';
    return 'text-red-400';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-black/40 backdrop-blur-xl
                     border border-white/30 rounded-2xl shadow-2xl">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">{data.name}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors
                       text-white hover:text-white/80"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                <h3 className="text-white/70 text-sm font-medium mb-2">Platform</h3>
                <p className="text-white text-lg font-semibold capitalize">{data.platform}</p>
              </div>

              <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                <h3 className="text-white/70 text-sm font-medium mb-2">Version</h3>
                <p className="text-white text-lg font-semibold">{data.version}</p>
              </div>

              <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                <h3 className="text-white/70 text-sm font-medium mb-2">Status</h3>
                <p className={`text-lg font-semibold ${getStatusColor(data.status)}`}>{data.status}</p>
              </div>

              <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                <h3 className="text-white/70 text-sm font-medium mb-2">Last Update</h3>
                <p className="text-white text-lg font-semibold">{formatDate(data.last_update)}</p>
              </div>

              <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                <h3 className="text-white/70 text-sm font-medium mb-2">Cost</h3>
                <p className={`text-lg font-bold ${data.cost === 'Free' || data.cost === 'Official' ? 'text-green-400' : 'text-yellow-400'}`}>
                  {data.cost}
                </p>
              </div>

              {data.detected !== undefined && (
                <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                  <h3 className="text-white/70 text-sm font-medium mb-2">Detection Status</h3>
                  <p className={`text-lg font-semibold ${data.detected ? 'text-red-400' : 'text-green-400'}`}>
                    {data.detected ? 'Detected' : 'Undetected'}
                  </p>
                </div>
              )}
            </div>

            {/* Advanced Information */}
            {(data.uncPercentage || data.suncPercentage || data.extype || data.rbxversion) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.uncPercentage && (
                  <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                    <h3 className="text-white/70 text-sm font-medium mb-2">UNC Compatibility</h3>
                    <p className="text-white text-lg font-semibold">{data.uncPercentage}%</p>
                  </div>
                )}

                {data.suncPercentage && (
                  <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                    <h3 className="text-white/70 text-sm font-medium mb-2">SUNC Compatibility</h3>
                    <p className="text-white text-lg font-semibold">{data.suncPercentage}%</p>
                  </div>
                )}

                {data.extype && (
                  <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                    <h3 className="text-white/70 text-sm font-medium mb-2">Executor Type</h3>
                    <p className="text-white text-lg font-semibold uppercase">{data.extype}</p>
                  </div>
                )}

                {data.rbxversion && (
                  <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                    <h3 className="text-white/70 text-sm font-medium mb-2">Roblox Version</h3>
                    <p className="text-white text-lg font-semibold">{data.rbxversion}</p>
                  </div>
                )}
              </div>
            )}

            {/* Features */}
            {(data.decompiler !== undefined || data.multiInject !== undefined || data.keysystem !== undefined || data.elementCertified !== undefined) && (
              <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                <h3 className="text-white/70 text-sm font-medium mb-4">Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {data.decompiler !== undefined && (
                    <div className={`p-2 rounded text-center text-sm font-medium ${
                      data.decompiler ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      Decompiler
                    </div>
                  )}
                  {data.multiInject !== undefined && (
                    <div className={`p-2 rounded text-center text-sm font-medium ${
                      data.multiInject ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      Multi-Inject
                    </div>
                  )}
                  {data.keysystem !== undefined && (
                    <div className={`p-2 rounded text-center text-sm font-medium ${
                      data.keysystem ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {data.keysystem ? 'Key System' : 'No Key System'}
                    </div>
                  )}
                  {data.elementCertified !== undefined && (
                    <div className={`p-2 rounded text-center text-sm font-medium ${
                      data.elementCertified ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {data.elementCertified ? 'Certified' : 'Not Certified'}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            {data.description && (
              <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                <h3 className="text-white/70 text-sm font-medium mb-2">Description</h3>
                <p className="text-white leading-relaxed">{data.description}</p>
              </div>
            )}

            {/* Links */}
            {(data.websitelink || data.discordlink || data.purchaselink) && (
              <div className="p-4 rounded-lg bg-white/10 border border-white/20">
                <h3 className="text-white/70 text-sm font-medium mb-4">Links</h3>
                <div className="flex flex-wrap gap-3">
                  {data.websitelink && (
                    <a
                      href={data.websitelink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg
                               font-medium transition-colors duration-300 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Website
                    </a>
                  )}
                  {data.discordlink && (
                    <a
                      href={data.discordlink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg
                               font-medium transition-colors duration-300 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                      </svg>
                      Discord
                    </a>
                  )}
                  {data.purchaselink && (
                    <a
                      href={data.purchaselink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg
                               font-medium transition-colors duration-300 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293A1 1 0 005 15h1.586" />
                      </svg>
                      Purchase
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}