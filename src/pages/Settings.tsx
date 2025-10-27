import { useState } from 'react';
import { User, Bell, CreditCard, Shield, Download, Palette } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import Layout from '../components/Layout';
import { toast } from 'sonner';
import { useCurrency, currencies } from '../lib/currency';

export default function Settings() {
  const { selectedCurrency, setCurrency } = useCurrency();
  
  const [profile, setProfile] = useState({
    firstName: 'Shreya',
    lastName: 'Designer',
    email: 'shreya@chalkcanva.com',
    phone: '+1 (555) 123-4567'
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    orderUpdates: true,
    promotions: false,
    newsletter: true
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en'
  });

  const handleProfileUpdate = () => {
    toast.success('Profile updated successfully!');
  };

  const handleNotificationUpdate = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success('Notification preferences updated!');
  };

  const handlePreferenceUpdate = (key: string, value: string) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    toast.success('Preferences updated!');
  };

  const handleCurrencyChange = (currencyCode: string) => {
    setCurrency(currencyCode);
    toast.success('Currency updated successfully!');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-pink-800 mb-8">Settings</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/40 backdrop-blur-sm border-pink-200/50">
            <TabsTrigger value="profile" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="preferences" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              <Palette className="w-4 h-4 mr-2" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card className="bg-white/40 backdrop-blur-sm border-pink-200/50">
              <CardHeader>
                <CardTitle className="text-pink-800">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-amber-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">S</span>
                  </div>
                  <div>
                    <Button variant="outline" className="!bg-transparent !hover:bg-transparent border-pink-300 text-pink-700">
                      Change Photo
                    </Button>
                    <p className="text-sm text-pink-600/70 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                <Separator className="bg-pink-200/50" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-pink-700">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                      className="bg-white/50 border-pink-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-pink-700">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                      className="bg-white/50 border-pink-200"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-pink-700">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="bg-white/50 border-pink-200"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-pink-700">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="bg-white/50 border-pink-200"
                  />
                </div>

                <Button 
                  onClick={handleProfileUpdate}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
                >
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card className="bg-white/40 backdrop-blur-sm border-pink-200/50">
              <CardHeader>
                <CardTitle className="text-pink-800">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-pink-800">Email Updates</div>
                      <div className="text-sm text-pink-600/70">Receive updates about your account via email</div>
                    </div>
                    <Switch
                      checked={notifications.emailUpdates}
                      onCheckedChange={(checked) => handleNotificationUpdate('emailUpdates', checked)}
                    />
                  </div>

                  <Separator className="bg-pink-200/50" />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-pink-800">Order Updates</div>
                      <div className="text-sm text-pink-600/70">Get notified about order status changes</div>
                    </div>
                    <Switch
                      checked={notifications.orderUpdates}
                      onCheckedChange={(checked) => handleNotificationUpdate('orderUpdates', checked)}
                    />
                  </div>

                  <Separator className="bg-pink-200/50" />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-pink-800">Promotions</div>
                      <div className="text-sm text-pink-600/70">Receive promotional offers and discounts</div>
                    </div>
                    <Switch
                      checked={notifications.promotions}
                      onCheckedChange={(checked) => handleNotificationUpdate('promotions', checked)}
                    />
                  </div>

                  <Separator className="bg-pink-200/50" />

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-pink-800">Newsletter</div>
                      <div className="text-sm text-pink-600/70">Weekly newsletter with new designs and tips</div>
                    </div>
                    <Switch
                      checked={notifications.newsletter}
                      onCheckedChange={(checked) => handleNotificationUpdate('newsletter', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences">
            <Card className="bg-white/40 backdrop-blur-sm border-pink-200/50">
              <CardHeader>
                <CardTitle className="text-pink-800">App Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-pink-700">Theme</Label>
                    <Select value={preferences.theme} onValueChange={(value) => handlePreferenceUpdate('theme', value)}>
                      <SelectTrigger className="bg-white/50 border-pink-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-pink-700">Currency</Label>
                    <Select value={selectedCurrency} onValueChange={handleCurrencyChange}>
                      <SelectTrigger className="bg-white/50 border-pink-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.symbol} {currency.name} ({currency.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-pink-700">Language</Label>
                    <Select value={preferences.language} onValueChange={(value) => handlePreferenceUpdate('language', value)}>
                      <SelectTrigger className="bg-white/50 border-pink-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card className="bg-white/40 backdrop-blur-sm border-pink-200/50">
                <CardHeader>
                  <CardTitle className="text-pink-800">Password & Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="!bg-transparent !hover:bg-transparent border-pink-300 text-pink-700">
                    Change Password
                  </Button>
                  <Button variant="outline" className="!bg-transparent !hover:bg-transparent border-pink-300 text-pink-700">
                    Enable Two-Factor Authentication
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/40 backdrop-blur-sm border-pink-200/50">
                <CardHeader>
                  <CardTitle className="text-pink-800">Data & Privacy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="!bg-transparent !hover:bg-transparent border-pink-300 text-pink-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download My Data
                  </Button>
                  <Button variant="outline" className="!bg-transparent !hover:bg-transparent border-red-300 text-red-700">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}