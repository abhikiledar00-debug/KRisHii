import React from "react";
import { ArrowUpRight, ArrowDownRight, X } from 'lucide-react';

interface Transaction {
  id: number;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending';
}

interface WalletDetailsProps {
  onClose: () => void;
}

export function WalletDetails({ onClose }: WalletDetailsProps) {
  const transactions: Transaction[] = [
    {
      id: 1,
      type: 'credit',
      amount: 5000,
      description: 'Payment from City Market',
      date: '24 Apr, 2:30 PM',
      status: 'completed',
    },
    {
      id: 2,
      type: 'debit',
      amount: 1200,
      description: 'Withdrawn to Bank',
      date: '23 Apr, 11:00 AM',
      status: 'completed',
    },
    {
      id: 3,
      type: 'credit',
      amount: 3500,
      description: 'Payment from Wholesale Hub',
      date: '22 Apr, 4:15 PM',
      status: 'pending',
    },
    {
      id: 4,
      type: 'credit',
      amount: 8200,
      description: 'Payment from Retail Store',
      date: '21 Apr, 9:45 AM',
      status: 'completed',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <h2 className="text-2xl">Transaction History</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="size-6" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className={`size-12 rounded-full flex items-center justify-center ${
                  transaction.type === 'credit'
                    ? 'bg-green-100'
                    : 'bg-red-100'
                }`}>
                  {transaction.type === 'credit' ? (
                    <ArrowDownRight className="size-6 text-green-600" />
                  ) : (
                    <ArrowUpRight className="size-6 text-red-600" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div className="text-sm">{transaction.description}</div>
                    <div className={`text-lg ${
                      transaction.type === 'credit'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-gray-500">{transaction.date}</div>
                    <div className={`text-xs px-2 py-0.5 rounded-full ${
                      transaction.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {transaction.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
