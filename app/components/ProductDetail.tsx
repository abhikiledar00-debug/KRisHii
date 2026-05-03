import React from "react";
import { useState } from 'react';
import { X, Video, MapPin, Star, User, ShoppingCart, Phone } from 'lucide-react';
import { OrderPlacement } from './OrderPlacement';

interface ProductDetailProps {
  product: {
    name: string;
    farmer: string;
    location: string;
    price: string;
    available: string;
    image: string;
    hasVideo: boolean;
    rating: number;
    description?: string;
  };
  onClose: () => void;
  onOrder?: () => void;
}

export function ProductDetail({ product, onClose, onOrder }: ProductDetailProps) {
  const [showOrderForm, setShowOrderForm] = useState(false);

  if (showOrderForm) {
    return (
      <OrderPlacement
        product={product}
        onClose={() => setShowOrderForm(false)}
        onConfirm={(data) => {
          console.log('Order confirmed:', data);
          onOrder?.();
          setShowOrderForm(false);
          onClose();
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
          >
            <X className="size-6" />
          </button>
          {product.hasVideo && (
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur rounded-lg px-3 py-2 flex items-center gap-2 text-white">
              <Video className="size-5" />
              <span className="text-sm">Video Available</span>
            </div>
          )}
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-3xl mb-2">{product.name}</h1>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1">
                <Star className="size-5 text-yellow-500 fill-yellow-500" />
                <span className="text-lg">{product.rating}</span>
              </div>
              <div className="text-gray-400">•</div>
              <div className="text-gray-600">{product.available} available</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="size-12 bg-green-100 rounded-full flex items-center justify-center">
                <User className="size-6 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-500">Sold by</div>
                <div className="text-lg">{product.farmer}</div>
              </div>
              <button className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50">
                <Phone className="size-5 text-gray-600" />
              </button>
            </div>

            <div className="flex items-start gap-2 pt-2 border-t">
              <MapPin className="size-5 text-gray-400 mt-0.5" />
              <div>
                <div className="text-sm text-gray-500">Location</div>
                <div>{product.location}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description ||
                'Fresh, high-quality produce directly from the farm. Harvested with care and ready for immediate delivery. Perfect for retail and wholesale buyers.'}
            </p>
          </div>

          {product.hasVideo && (
            <div>
              <h3 className="text-lg mb-3">Quality Verification Video</h3>
              <div className="bg-gray-100 rounded-xl aspect-video flex items-center justify-center">
                <div className="text-center">
                  <Video className="size-16 text-gray-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-500">Tap to play video</div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-green-50 rounded-xl p-4">
            <div className="text-sm text-green-800 mb-1">Secure Payment</div>
            <div className="text-xs text-green-700">
              Payment held in escrow until delivery is confirmed
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t p-4 flex items-center gap-4">
          <div className="flex-1">
            <div className="text-sm text-gray-500">Price</div>
            <div className="text-3xl text-blue-600">{product.price}</div>
          </div>
          <button
            onClick={() => setShowOrderForm(true)}
            className="flex-1 bg-blue-600 text-white rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            <ShoppingCart className="size-5" />
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
