import React from "react";
import { X, Phone, Mail, MessageCircle, Book, Video, AlertCircle } from 'lucide-react';

interface HelpSupportProps {
  onClose: () => void;
}

export function HelpSupport({ onClose }: HelpSupportProps) {
  const supportOptions = [
    {
      icon: Phone,
      title: 'Call Support',
      description: 'Talk to our team',
      action: 'Call Now',
      color: 'green',
      contact: '1800-123-4567',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with support agent',
      action: 'Start Chat',
      color: 'blue',
      contact: 'Available 24/7',
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us an email',
      action: 'Send Email',
      color: 'orange',
      contact: 'support@krishiconnect.com',
    },
  ];

  const resources = [
    {
      icon: Book,
      title: 'User Guide',
      description: 'Learn how to use the app',
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
    },
    {
      icon: AlertCircle,
      title: 'FAQs',
      description: 'Common questions answered',
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl mb-1">Help & Support</h2>
            <p className="text-sm text-gray-600">We're here to help you</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="size-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg mb-3">Contact Us</h3>
            <div className="space-y-3">
              {supportOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <div key={index} className="bg-white border-2 border-gray-200 rounded-2xl p-4 hover:border-green-300 transition">
                    <div className="flex items-center gap-4">
                      <div className={`size-14 bg-${option.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`size-7 text-${option.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-lg mb-1">{option.title}</div>
                        <div className="text-sm text-gray-600 mb-2">{option.description}</div>
                        <div className="text-xs text-gray-500">{option.contact}</div>
                      </div>
                      <button className={`bg-${option.color}-600 text-white rounded-xl px-4 py-2 text-sm hover:bg-${option.color}-700 transition`}>
                        {option.action}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-lg mb-3">Help Resources</h3>
            <div className="space-y-3">
              {resources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <button
                    key={index}
                    className="w-full bg-gray-50 rounded-xl p-4 flex items-center gap-3 hover:bg-gray-100 transition"
                  >
                    <div className="size-12 bg-white rounded-full flex items-center justify-center">
                      <Icon className="size-6 text-gray-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm mb-1">{resource.title}</div>
                      <div className="text-xs text-gray-500">{resource.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <MessageCircle className="size-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <div className="text-sm text-green-900 mb-2">
                  Need help in your language?
                </div>
                <div className="text-xs text-green-700 mb-3">
                  Our support team speaks English, Hindi, Kannada, and Marathi
                </div>
                <button className="bg-green-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-green-700 transition">
                  Get Help Now
                </button>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500 pt-4">
            KrishiConnect v1.0.0 • © 2026
          </div>
        </div>
      </div>
    </div>
  );
}
