import React from "react";
import { CheckCircle, Clock, Truck, Package } from 'lucide-react';

interface OrderTrackingProps {
  status: 'pending' | 'accepted' | 'in-transit' | 'delivered';
}

export function OrderTracking({ status }: OrderTrackingProps) {
  const steps = [
    { key: 'pending', label: 'Order Placed', icon: Package },
    { key: 'accepted', label: 'Accepted', icon: CheckCircle },
    { key: 'in-transit', label: 'In Transit', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle },
  ];

  const statusIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h3 className="text-lg mb-6">Order Status</h3>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= statusIndex;
            const isCurrent = index === statusIndex;

            return (
              <div key={step.key} className="relative flex items-center gap-4">
                <div className={`relative z-10 size-12 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                } ${isCurrent ? 'ring-4 ring-green-200' : ''}`}>
                  <Icon className="size-6" />
                </div>

                <div className="flex-1">
                  <div className={`text-sm ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.label}
                  </div>
                  {isCurrent && (
                    <div className="text-xs text-green-600 mt-1">In Progress...</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
        <div className="text-sm text-blue-900 mb-1">Payment Status</div>
        <div className="text-xs text-blue-700">
          {status === 'delivered'
            ? 'Payment released to farmer'
            : 'Held securely until delivery'}
        </div>
      </div>
    </div>
  );
}
