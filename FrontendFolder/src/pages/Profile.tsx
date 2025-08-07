import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, Edit, Settings, LogOut, PenTool, Eye, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface UserStats {
  postsPublished: number;
  totalViews: number;
  totalLikes: number;
  joinDate: string;
}

interface UserPost {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  views: number;
  likes: number;
  status: 'published' | 'draft';
}

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'posts' | 'drafts' | 'settings'>('posts');

  // Mock user stats and posts
  const stats: UserStats = {
    postsPublished: 12,
    totalViews: 15420,
    totalLikes: 342,
    joinDate: '2024-03-15'
  };

  const userPosts: UserPost[] = [
    {
      id: '1',
      title: 'The Future of Web Development: Trends to Watch in 2025',
      excerpt: 'Explore the latest trends shaping the future of web development, from AI integration to serverless architectures.',
      publishedAt: '2025-01-08',
      views: 1250,
      likes: 24,
      status: 'published'
    },
    {
      id: '2',
      title: 'Building Scalable React Applications',
      excerpt: 'Best practices and patterns for creating maintainable React applications that can grow with your team.',
      publishedAt: '2025-01-05',
      views: 890,
      likes: 18,
      status: 'published'
    },
    {
      id: '3',
      title: 'Understanding Modern CSS Grid',
      excerpt: 'A comprehensive guide to CSS Grid layout and how it can simplify your web layouts.',
      publishedAt: '2025-01-02',
      views: 0,
      likes: 0,
      status: 'draft'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  const publishedPosts = userPosts.filter(post => post.status === 'published');
  const draftPosts = userPosts.filter(post => post.status === 'draft');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
              <p className="text-indigo-100 mb-4 flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                {user.email}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">{stats.postsPublished}</div>
                  <div className="text-indigo-100 text-sm">Posts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.totalViews.toLocaleString()}</div>
                  <div className="text-indigo-100 text-sm">Views</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.totalLikes}</div>
                  <div className="text-indigo-100 text-sm">Likes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{new Date(stats.joinDate).getFullYear()}</div>
                  <div className="text-indigo-100 text-sm">Joined</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b">
          <nav className="flex px-6">
            {[
              { key: 'posts', label: 'Published Posts', icon: PenTool },
              { key: 'drafts', label: 'Drafts', icon: Edit },
              { key: 'settings', label: 'Settings', icon: Settings }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center space-x-2 px-4 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === key
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'posts' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Published Articles</h2>
                <button
                  onClick={() => navigate('/create-blog')}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Write New Article
                </button>
              </div>

              {publishedPosts.length > 0 ? (
                <div className="space-y-6">
                  {publishedPosts.map(post => (
                    <div key={post.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(post.publishedAt)}
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {post.views.toLocaleString()} views
                            </span>
                            <span className="flex items-center">
                              <Heart className="h-4 w-4 mr-1" />
                              {post.likes} likes
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button className="text-gray-400 hover:text-gray-600 p-1">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => navigate(`/blog/${post.id}`)}
                            className="text-indigo-600 hover:text-indigo-700 px-3 py-1 text-sm font-medium"
                          >
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <PenTool className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No published posts yet</h3>
                  <p className="text-gray-600 mb-4">Start writing and share your thoughts with the world!</p>
                  <button
                    onClick={() => navigate('/create-blog')}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Write Your First Post
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'drafts' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Draft Articles</h2>
                <button
                  onClick={() => navigate('/create-blog')}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  New Draft
                </button>
              </div>

              {draftPosts.length > 0 ? (
                <div className="space-y-6">
                  {draftPosts.map(post => (
                    <div key={post.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {post.title}
                            </h3>
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                              Draft
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Last edited {formatDate(post.publishedAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <button className="text-indigo-600 hover:text-indigo-700 px-3 py-1 text-sm font-medium">
                            Continue Editing
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Edit className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No drafts saved</h3>
                  <p className="text-gray-600">Your draft articles will appear here.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={user.name}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Account Actions</h3>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;