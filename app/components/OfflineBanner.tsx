import React from "react";
import { WifiOff, RefreshCw } from 'lucide-react';

interface OfflineBannerProps {
  pendingChanges?: number;
  onSync?: () => void;
}

export function OfflineBanner({ pendingChanges = 0, onSync }: OfflineBannerProps) {
  return (
    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <WifiOff className="size-6 text-yellow-700 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="text-sm text-yellow-900 mb-1">
            You are currently offline
          </div>
          <div className="text-xs text-yellow-700">
            {pendingChanges > 0
              ? `${pendingChanges} changes saved locally. Will sync when online.`
              : 'Changes will be saved locally and synced when you reconnect.'}
          </div>
          {pendingChanges > 0 && (
            <button
              onClick={onSync}
              className="mt-2 flex items-center gap-1 text-xs text-yellow-800 hover:text-yellow-900"
            >
              <RefreshCw className="size-3" />
              Try to sync now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
