import React from "react";
import { useState } from 'react';
import { X, Plus, Minus, Calendar, Truck } from 'lucide-react';

interface OrderPlacementProps {
  product: {
    name: string;
    price: string;
    available: string;
    farmer: string;
  };
  onClose: () => void;
  onConfirm: (orderData: any) => void;
}

export function OrderPlacement({ product, onClose, onConfirm }: OrderPlacementProps) {
  const [quantity, setQuantity] = useState(50);
  const [deliveryDate, setDeliveryDate] = useState('2026-04-25');
  const [needsTransport, setNeedsTransport] = useState(true);

  const pricePerKg = parseInt(product.price.replace(/[^0-9]/g, ''));
  const total = quantity * pricePerKg;
  const transportFee = needsTransport ? 500 : 0;
  const grandTotal = total + transportFee;

  const handleConfirm = () => {
    onConfirm({
      product: product.name,
      quantity,
      deliveryDate,
      needsTransport,
      total: grandTotal,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Place Order</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="size-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="text-sm text-gray-600 mb-1">Product</div>
            <div className="text-lg mb-2">{product.name}</div>
            <div className="text-sm text-gray-500">from {product.farmer}</div>
          </div>

          <div>
            <label className="block text-sm mb-3">Quantity (kg)</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(10, quantity - 10))}
                className="size-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
              >
                <Minus className="size-6" />
              </button>
              <div className="flex-1 text-center">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                  className="w-full text-center text-3xl border-2 border-gray-200 rounded-xl py-3 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button
                onClick={() => setQuantity(quantity + 10)}
                className="size-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700"
              >
                <Plus className="size-6" />
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              {product.available} available
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Delivery Date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 cursor-pointer">
              <input
                type="checkbox"
                checked={needsTransport}
                onChange={(e) => setNeedsTransport(e.target.checked)}
                className="size-5 accent-blue-600"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Truck className="size-5 text-blue-600" />
                  <span>Need Transportation</span>
                </div>
                <div className="text-xs text-gray-600">
                  We'll arrange pickup and delivery (+₹{transportFee})
                </div>
              </div>
            </label>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 space-y-2">
            <h3 className="text-sm mb-3">Order Summary</h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {product.name} ({quantity} kg × {product.price})
              </span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            {needsTransport && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Transportation</span>
                <span>₹{transportFee.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between text-lg">
              <span>Total</span>
              <span className="text-blue-600">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
            <div className="text-sm text-green-900 mb-1">💰 Secure Payment</div>
            <div className="text-xs text-green-700">
              Payment will be held in your wallet until delivery is confirmed by you
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={handleConfirm}
              className="w-full bg-blue-600 text-white rounded-xl py-4 text-lg hover:bg-blue-700 transition"
            >
              Confirm Order
            </button>
            <button
              onClick={onClose}
              className="w-full border-2 border-gray-200 rounded-xl py-4 text-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
