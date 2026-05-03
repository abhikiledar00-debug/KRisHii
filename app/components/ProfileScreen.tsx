import React from "react";
import { User, Phone, Mail, MapPin, Calendar, TrendingUp, Package, IndianRupee, Star, LogOut, Edit, HelpCircle, Settings, Shield } from 'lucide-react';

interface ProfileScreenProps {
  userType: 'farmer' | 'retailer' | 'transporter';
  onLogout: () => void;
  onClose: () => void;
}

export function ProfileScreen({ userType, onLogout, onClose }: ProfileScreenProps) {
  const profiles = {
    farmer: {
      name: 'Ramesh Kumar',
      phone: '+91 98765 43210',
      email: 'ramesh.kumar@example.com',
      location: 'Belgaum, Karnataka',
      joinDate: 'Jan 2025',
      stats: [
        { icon: Package, label: 'Total Crops Sold', value: '245', color: 'green' },
        { icon: TrendingUp, label: 'Success Rate', value: '98%', color: 'blue' },
        { icon: IndianRupee, label: 'Total Earnings', value: '₹3.2L', color: 'orange' },
        { icon: Star, label: 'Average Rating', value: '4.8', color: 'yellow' },
      ],
    },
    retailer: {
      name: 'Suresh Patil',
      phone: '+91 98765 43211',
      email: 'suresh.patil@example.com',
      location: 'Mumbai, Maharashtra',
      joinDate: 'Feb 2025',
      stats: [
        { icon: Package, label: 'Total Orders', value: '189', color: 'blue' },
        { icon: TrendingUp, label: 'Active Orders', value: '24', color: 'green' },
        { icon: IndianRupee, label: 'Total Spent', value: '₹5.8L', color: 'orange' },
        { icon: Star, label: 'Supplier Rating', value: '4.6', color: 'yellow' },
      ],
    },
    transporter: {
      name: 'Vijay Singh',
      phone: '+91 98765 43212',
      email: 'vijay.singh@example.com',
      location: 'Pune, Maharashtra',
      joinDate: 'Dec 2024',
      stats: [
        { icon: Package, label: 'Total Deliveries', value: '342', color: 'orange' },
        { icon: TrendingUp, label: 'Success Rate', value: '99%', color: 'green' },
        { icon: IndianRupee, label: 'Total Earnings', value: '₹4.5L', color: 'blue' },
        { icon: Star, label: 'Average Rating', value: '4.9', color: 'yellow' },
      ],
    },
  };

  const profile = profiles[userType];
  const colorMap = {
    farmer: 'green',
    retailer: 'blue',
    transporter: 'orange',
  };
  const color = colorMap[userType];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className={`bg-gradient-to-br from-${color}-600 to-${color}-700 text-white p-6 pb-12 rounded-b-3xl`}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl">My Account</h1>
          <button onClick={onClose} className="p-2 bg-white/20 backdrop-blur rounded-full hover:bg-white/30">
            <Settings className="size-6" />
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className={`size-20 bg-white rounded-full flex items-center justify-center text-${color}-600`}>
            <User className="size-10" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl mb-1">{profile.name}</h2>
            <div className={`text-${color}-100 text-sm capitalize`}>
              {userType}
            </div>
          </div>
          <button className={`p-2 bg-white/20 backdrop-blur rounded-full hover:bg-white/30`}>
            <Edit className="size-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-3">
            <Phone className="size-5" />
            <span>{profile.phone}</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-3">
            <Mail className="size-5" />
            <span className="text-sm">{profile.email}</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-3">
            <MapPin className="size-5" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-xl p-3">
            <Calendar className="size-5" />
            <span>Member since {profile.joinDate}</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <h3 className="text-xl mt-2">Performance Statistics</h3>

        <div className="grid grid-cols-2 gap-3">
          {profile.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-4 shadow-md">
                <div className={`size-12 bg-${stat.color}-100 rounded-full flex items-center justify-center mb-3`}>
                  <Icon className={`size-6 text-${stat.color}-600`} />
                </div>
                <div className="text-2xl mb-1">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="space-y-3 pt-4">
          <button className="w-full bg-white rounded-xl p-4 flex items-center gap-3 shadow-md hover:shadow-lg transition">
            <div className="size-12 bg-blue-100 rounded-full flex items-center justify-center">
              <HelpCircle className="size-6 text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-lg">Help & Support</div>
              <div className="text-xs text-gray-500">Get help or report issues</div>
            </div>
          </button>

          <button className="w-full bg-white rounded-xl p-4 flex items-center gap-3 shadow-md hover:shadow-lg transition">
            <div className="size-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Shield className="size-6 text-purple-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-lg">Privacy & Security</div>
              <div className="text-xs text-gray-500">Manage your data</div>
            </div>
          </button>

          <button
            onClick={onLogout}
            className="w-full bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3 hover:bg-red-100 transition"
          >
            <div className="size-12 bg-red-100 rounded-full flex items-center justify-center">
              <LogOut className="size-6 text-red-600" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-lg text-red-600">Logout</div>
              <div className="text-xs text-red-500">Sign out of your account</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
