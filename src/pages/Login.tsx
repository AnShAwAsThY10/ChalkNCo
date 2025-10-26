import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn, User, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../lib/auth';
import Layout from '../components/Layout';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    const success = login(formData.username, formData.password);
    
    if (success) {
      if (formData.username === 'admin') {
        toast.success('Welcome Admin! You have full access.');
        navigate('/admin');
      } else {
        toast.success(`Welcome ${formData.username}!`);
        navigate(from, { replace: true });
      }
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-16">
        <Card className="bg-white/60 backdrop-blur-sm border-pink-200/50 shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-pink-800">Welcome Back</CardTitle>
            <p className="text-pink-600/70">Sign in to your account</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-pink-700">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-4 h-4" />
                  <Input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    className="pl-10 bg-white/50 border-pink-200 focus:border-pink-400"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-pink-700">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 bg-white/50 border-pink-200 focus:border-pink-400"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 p-4 bg-pink-50/50 rounded-lg border border-pink-200/50">
              <h4 className="font-semibold text-pink-800 mb-2">Demo Credentials:</h4>
              <div className="text-sm text-pink-700 space-y-1">
                <p><strong>Admin Access:</strong> admin / admin</p>
                <p><strong>Customer Access:</strong> Any other username/password</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}