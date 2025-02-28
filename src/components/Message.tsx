import React from 'react';
import { useChat } from '../context/ChatContext';
import { motion } from 'framer-motion';
import { Copy, Volume2, Play, Check, Code2, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MessageProps {
  content: string;
  sender: 'user' | 'bot';
  imageUrl?: string;
}

const Message = ({ content, sender, imageUrl  }: MessageProps) => {
  const { copyResponse, speakResponse } = useChat();
  const [copied, setCopied] = React.useState(false);
  const [codeExecuted, setCodeExecuted] = React.useState<{ [key: string]: boolean }>({});

  const handleCopy = async (text: string) => {
    await copyResponse(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const executeCode = (code: string, language: string) => {
    if (language === 'javascript' || language === 'typescript') {
      try {
        // Create a safe environment for code execution
        const safeEval = new Function('console', code);
        const logs: string[] = [];
        const customConsole = {
          log: (...args: any[]) => logs.push(args.join(' ')),
          error: (...args: any[]) => logs.push(`Error: ${args.join(' ')}`),
          warn: (...args: any[]) => logs.push(`Warning: ${args.join(' ')}`),
        };
        
        safeEval(customConsole);
        
        // Show results in a custom alert
        const alertContainer = document.createElement('div');
        alertContainer.className = 'custom-alert';
        alertContainer.innerHTML = `
          <div class="custom-alert-content">
            <h3 class="font-semibold">Code Execution Results:</h3>
            <pre class="bg-gray-800 p-3 rounded-lg text-sm overflow-x-auto">
              ${logs.join('\n')}
            </pre>
            <button class="custom-alert-close">Close</button>
          </div>
        `;
        
        document.body.appendChild(alertContainer);
        
        const closeButton = alertContainer.querySelector('.custom-alert-close');
        if (closeButton) {
          closeButton.addEventListener('click', () => {
            alertContainer.remove();
          });
        }

        setTimeout(() => {
          alertContainer.remove();
        }, 5000);
      } catch (error) {
        console.error('Code execution error:', error);
        // Show error in a custom alert
        const alertContainer = document.createElement('div');
        alertContainer.className = 'custom-alert';
        alertContainer.innerHTML = `
          <div class="custom-alert-content">
            <h3 class="font-semibold">Code Execution Error:</h3>
            <pre class="bg-gray-800 p-3 rounded-lg text-sm overflow-x-auto">
              ${error instanceof Error ? error.message : 'Unknown error'}
            </pre>
            <button class="custom-alert-close">Close</button>
          </div>
        `;
        
        document.body.appendChild(alertContainer);
        
        const closeButton = alertContainer.querySelector('.custom-alert-close');
        if (closeButton) {
          closeButton.addEventListener('click', () => {
            alertContainer.remove();
          });
        }

        setTimeout(() => {
          alertContainer.remove();
        }, 5000);
      }
    }
  };

  const getLanguageLabel = (language: string): string => {
    const labels: { [key: string]: string } = {
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      python: 'Python',
      java: 'Java',
      cpp: 'C++',
      csharp: 'C#',
      php: 'PHP',
      ruby: 'Ruby',
      swift: 'Swift',
      kotlin: 'Kotlin',
      rust: 'Rust',
      go: 'Go',
      sql: 'SQL',
      html: 'HTML',
      css: 'CSS',
      json: 'JSON',
      yaml: 'YAML',
      markdown: 'Markdown',
      bash: 'Bash',
      shell: 'Shell',
      dockerfile: 'Dockerfile',
    };
    return labels[language] || language.charAt(0).toUpperCase() + language.slice(1);
  };

  return (
    <motion.div
      className={`chat ${sender === 'user' ? 'outgoing' : 'incoming'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="chat-content">
        <div className="chat-details">
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={sender === 'user' ? 'https://lexa-as.netlify.app/images/user.jpg' : 'https://lexa-as.netlify.app/images/brain.png'}
            alt={`${sender}-img`}
            className="w-10 h-10 border-2 rounded-xl border-indigo-500/20"
          />
          <div className="prose message-content prose-invert max-w-none">
            {imageUrl ? (
              <div className="mt-2 mb-4">
                <p className="mb-2">{content}</p>
                <div className="relative group">
                  <img 
                    src={imageUrl} 
                    alt="Generated" 
                    className="w-full max-w-lg rounded-lg shadow-lg"
                  />
                  <div className="absolute transition-opacity opacity-0 top-2 right-2 group-hover:opacity-100">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDownload(imageUrl)}
                      className="p-2 text-white bg-black bg-opacity-50 rounded-lg"
                      title="Download image"
                    >
                      <Download size={18} />
                    </motion.button>
                  </div>
                </div>
              </div>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  table: ({ node, ...props }) => (
                    <div className="my-4 overflow-x-auto">
                      <table className="min-w-full border border-gray-700 divide-y divide-gray-700 rounded-lg" {...props} />
                    </div>
                  ),
                  thead: ({ node, ...props }) => (
                    <thead className="bg-gray-800" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="px-6 py-4 text-sm text-gray-300 border-t border-gray-700 whitespace-nowrap" {...props} />
                  ),
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const language = match ? match[1] : '';
                    const code = String(children).replace(/\n$/, '');

                    if (!inline && match) {
                      return (
                        <div className="code-block-wrapper group">
                          <div className="code-block-header">
                            <div className="code-language">
                              <Code2 size={14} />
                              <span>{getLanguageLabel(language)}</span>
                            </div>
                            <div className="code-actions">
                              <button
                                onClick={() => handleCopy(code)}
                                className="code-action-btn"
                                title="Copy code"
                              >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                              </button>
                              {(language === 'javascript' || language === 'typescript') && (
                                <button
                                  onClick={() => executeCode(code, language)}
                                  className="code-action-btn code-action-btn-run"
                                  title="Run code"
                                >
                                  <Play size={14} />
                                </button>
                              )}
                            </div>
                          </div>
                          <SyntaxHighlighter
                            style={atomDark}
                            language={language}
                            PreTag="div"
                            className="code-block-content"
                            {...props}
                          >
                            {code}
                          </SyntaxHighlighter>
                        </div>
                      );
                    }

                    return (
                      <code className={`${className} bg-gray-800 rounded-md px-1.5 py-0.5`} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            )}
          </div>
        </div>
        {sender === 'bot' && (
          <div className="chat-actions">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleCopy(content)}
              className="action-btn"
              title="Copy response"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </motion.button>
            {!imageUrl && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => speakResponse(content)}
                className="action-btn"
                title="Speak response"
              >
                <Volume2 size={18} />
              </motion.button>
            )}
            {imageUrl && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDownload(imageUrl)}
                className="action-btn"
                title="Download image"
              >
                <Download size={18} />
              </motion.button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Message;