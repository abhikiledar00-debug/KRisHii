import React from "react";
import { Wallet, Plus, ArrowDownToLine, History } from 'lucide-react';

interface WalletCardProps {
  balance: number;
  onAddMoney?: () => void;
  onWithdraw?: () => void;
  onViewHistory?: () => void;
}

export function WalletCard({ balance, onAddMoney, onWithdraw, onViewHistory }: WalletCardProps) {
  return (
    <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wallet className="size-6" />
          <span className="text-sm opacity-90">Wallet Balance</span>
        </div>
        <button onClick={onViewHistory} className="p-2 hover:bg-white/10 rounded-lg transition">
          <History className="size-5" />
        </button>
      </div>

      <div className="mb-6">
        <div className="text-4xl mb-1">₹{balance.toLocaleString('en-IN')}</div>
        <div className="text-xs opacity-75">Secured & Protected</div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onAddMoney}
          className="flex-1 bg-white text-green-600 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
        >
          <Plus className="size-5" />
          <span>Add Money</span>
        </button>
        <button
          onClick={onWithdraw}
          className="flex-1 bg-white/20 backdrop-blur rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-white/30 transition"
        >
          <ArrowDownToLine className="size-5" />
          <span>Withdraw</span>
        </button>
      </div>
    </div>
  );
}
