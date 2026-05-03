import React from "react";
import { useState } from 'react';
import { X, Camera, Video, Mic } from 'lucide-react';

interface AddProduceFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function AddProduceForm({ onClose, onSubmit }: AddProduceFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: 'kg',
    price: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Add New Produce</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="size-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Crop Name</label>
            <div className="relative">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Tomatoes"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:outline-none"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-green-50 rounded-lg hover:bg-green-100"
              >
                <Mic className="size-5 text-green-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-2">Quantity</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="e.g., 50"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Unit</label>
              <select
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-green-500 focus:outline-none"
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="quintal">Quintals</option>
                <option value="ton">Tons</option>
                <option value="bag">Bags</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Price per {formData.unit}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g., 25"
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Add Photos/Video</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="border-2 border-dashed border-gray-300 rounded-xl py-8 flex flex-col items-center gap-2 hover:bg-gray-50"
              >
                <Camera className="size-8 text-gray-400" />
                <span className="text-sm text-gray-600">Add Photo</span>
              </button>
              <button
                type="button"
                className="border-2 border-dashed border-gray-300 rounded-xl py-8 flex flex-col items-center gap-2 hover:bg-gray-50"
              >
                <Video className="size-8 text-gray-400" />
                <span className="text-sm text-gray-600">Record Video</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              📹 Video helps buyers verify quality
            </p>
          </div>

          <div className="pt-4 space-y-3">
            <button
              type="submit"
              className="w-full bg-green-600 text-white rounded-xl py-4 text-lg hover:bg-green-700 transition"
            >
              List Produce
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full border-2 border-gray-200 rounded-xl py-4 text-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
