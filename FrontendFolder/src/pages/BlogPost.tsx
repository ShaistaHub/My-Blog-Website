import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Heart, MessageCircle, Share2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  image: string;
  likes: number;
  comments: number;
  category: string;
  isLiked: boolean;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch blog post
    setTimeout(() => {
      const mockPost: BlogPost = {
        id: id || '1',
        title: 'The Future of Web Development: Trends to Watch in 2025',
        content: `Web development continues to evolve at a rapid pace, and 2025 promises to bring exciting new trends and technologies that will reshape how we build and interact with web applications.

## The Rise of AI-Powered Development

Artificial Intelligence is no longer just a buzzword in web development. In 2025, we're seeing AI tools become integral to the development process, from code generation to automated testing and optimization.

### Key AI Developments:

- **Code Completion and Generation**: Tools like GitHub Copilot have evolved to provide more context-aware suggestions
- **Automated Testing**: AI-driven testing frameworks that can predict potential bugs and write comprehensive test suites
- **Performance Optimization**: Machine learning algorithms that analyze user behavior to optimize site performance in real-time

## Serverless Architecture Maturation

Serverless computing has moved beyond the hype phase and is now a mature, production-ready approach for building scalable applications.

### Benefits of Serverless in 2025:

1. **Cost Efficiency**: Pay only for what you use, reducing operational costs
2. **Scalability**: Automatic scaling based on demand
3. **Developer Productivity**: Focus on code rather than infrastructure management

## The Evolution of JavaScript Frameworks

The JavaScript ecosystem continues to innovate, with frameworks becoming more efficient and developer-friendly.

### Notable Trends:

- **Partial Hydration**: Frameworks are adopting selective hydration strategies to improve performance
- **Edge Computing**: Running JavaScript at the edge for better user experiences
- **Type Safety**: TypeScript adoption continues to grow, with more frameworks providing built-in TypeScript support

## Web3 Integration

While still emerging, Web3 technologies are beginning to find practical applications in mainstream web development.

### Practical Web3 Applications:

- **Decentralized Identity**: User authentication without centralized providers
- **Blockchain-based Storage**: Distributed storage solutions for better data resilience
- **Smart Contracts**: Automated business logic execution without intermediaries

## Conclusion

The future of web development is bright, with these trends pointing toward more intelligent, efficient, and user-centric applications. As developers, staying informed about these changes will be crucial for building the next generation of web experiences.

What excites you most about the future of web development? Share your thoughts in the comments below!`,
        author: {
          name: 'Sarah Chen',
          avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
        },
        publishedAt: '2025-01-08',
        readTime: '8 min read',
        image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
        likes: 24,
        comments: 8,
        category: 'Technology',
        isLiked: false
      };

      const mockComments: Comment[] = [
        {
          id: '1',
          author: 'Mike Johnson',
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
          content: 'Great insights! The AI-powered development tools have already changed how I work. Excited to see what 2025 brings.',
          timestamp: '2025-01-08T10:30:00Z'
        },
        {
          id: '2',
          author: 'Emma Davis',
          avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
          content: 'The serverless section was particularly helpful. We\'re considering migrating our current architecture and this gives me confidence in the decision.',
          timestamp: '2025-01-08T14:15:00Z'
        },
        {
          id: '3',
          author: 'Alex Rivera',
          avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
          content: 'Web3 integration is still a bit unclear to me. Do you have any recommendations for getting started with practical Web3 applications?',
          timestamp: '2025-01-08T16:45:00Z'
        }
      ];

      setPost(mockPost);
      setComments(mockComments);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleLike = () => {
    if (!post || !user) return;
    
    setPost(prev => prev ? {
      ...prev,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
      isLiked: !prev.isLiked
    } : null);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: user.name,
      avatar: user.avatar || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
      content: newComment,
      timestamp: new Date().toISOString()
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
    
    if (post) {
      setPost(prev => prev ? { ...prev, comments: prev.comments + 1 } : null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCommentDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
          <div className="h-64 bg-gray-300 rounded mb-8"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-4 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Articles</span>
      </button>

      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
          <span className="text-gray-500 text-sm flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="text-gray-500 text-sm flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {post.readTime}
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-900">{post.author.name}</p>
              <p className="text-sm text-gray-500">Author</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                post.isLiked
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-1 bg-gray-100 text-gray-600 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg mb-8"
          />
        )}
      </header>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        {post.content.split('\n').map((paragraph, index) => {
          if (paragraph.startsWith('## ')) {
            return (
              <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                {paragraph.replace('## ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('- ')) {
            return (
              <li key={index} className="text-gray-700 mb-2">
                {paragraph.replace('- ', '')}
              </li>
            );
          }
          if (/^\d+\./.test(paragraph)) {
            return (
              <li key={index} className="text-gray-700 mb-2">
                {paragraph.replace(/^\d+\.\s/, '')}
              </li>
            );
          }
          return paragraph.trim() ? (
            <p key={index} className="text-gray-700 mb-4 leading-relaxed">
              {paragraph}
            </p>
          ) : null;
        })}
      </div>

      {/* Comments Section */}
      <section className="border-t pt-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <MessageCircle className="h-6 w-6 mr-2" />
          Comments ({post.comments})
        </h3>

        {user ? (
          <form onSubmit={handleComment} className="mb-8">
            <div className="flex items-start space-x-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg mb-8">
            <p className="text-gray-600 mb-4">Sign in to join the conversation</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Sign In
            </button>
          </div>
        )}

        <div className="space-y-6">
          {comments.map(comment => (
            <div key={comment.id} className="flex items-start space-x-4">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-gray-900">{comment.author}</h4>
                  <span className="text-sm text-gray-500">
                    {formatCommentDate(comment.timestamp)}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default BlogPost;