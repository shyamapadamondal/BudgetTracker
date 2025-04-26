import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import { User, Bell, Shield, CreditCard, HelpCircle, Languages } from 'lucide-react';

const Settings: React.FC = () => {
  const settingsSections = [
    {
      title: 'Profile Settings',
      icon: User,
      items: [
        { label: 'Personal Information', description: 'Update your personal details and contact information' },
        { label: 'Email Preferences', description: 'Manage your email notifications and subscriptions' },
        { label: 'Password & Security', description: 'Change your password and security settings' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Push Notifications', description: 'Configure mobile and desktop notifications' },
        { label: 'Budget Alerts', description: 'Set up alerts for budget thresholds and goals' },
        { label: 'Transaction Alerts', description: 'Get notified about specific transaction types' }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: Shield,
      items: [
        { label: 'Privacy Settings', description: 'Control your data sharing preferences' },
        { label: 'Two-Factor Authentication', description: 'Add an extra layer of security to your account' },
        { label: 'Connected Devices', description: 'Manage devices connected to your account' }
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 gap-6">
          {settingsSections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <section.icon className="w-5 h-5 text-blue-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
                </div>

                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{item.label}</h3>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      </div>
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                        Configure
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Additional Settings */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Additional Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="text-left">
                    <h3 className="text-sm font-medium text-gray-900">Payment Methods</h3>
                    <p className="text-sm text-gray-500">Manage your payment options</p>
                  </div>
                </button>
                <button className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <Languages className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="text-left">
                    <h3 className="text-sm font-medium text-gray-900">Language & Region</h3>
                    <p className="text-sm text-gray-500">Set your preferred language</p>
                  </div>
                </button>
                <button className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <HelpCircle className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="text-left">
                    <h3 className="text-sm font-medium text-gray-900">Help & Support</h3>
                    <p className="text-sm text-gray-500">Get help with your account</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;