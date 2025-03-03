// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Image, Download, Copy, Sparkles, RefreshCw } from 'lucide-react';

// const ImageGeneratePage = () => {
//   const [prompt, setPrompt] = useState('');
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [generatedImages, setGeneratedImages] = useState<{ prompt: string; imageUrl: string }[]>([]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!prompt.trim()) return;

//     setIsGenerating(true);
    
//     try {
//       const response = await fetch('http://localhost:3000/api/generateImage', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt }),
//       });

//       const data = await response.json();
      
//       if (data.imageUrl) {
//         setGeneratedImages([
//           { prompt, imageUrl: data.imageUrl },
//           ...generatedImages
//         ]);
//         setPrompt('');
//       } else {
//         showCustomAlert('Error: Failed to generate image.');
//       }
//     } catch (error) {
//       console.error('Error generating image:', error);
//       showCustomAlert('Error: Failed to connect to the image generation service.');
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleDownload = (imageUrl: string) => {
//     const link = document.createElement('a');
//     link.href = imageUrl;
//     link.download = `generated-image-${Date.now()}.png`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleCopyPrompt = (text: string) => {
//     navigator.clipboard.writeText(text);
//     showCustomAlert('Prompt copied to clipboard!');
//   };

//   const showCustomAlert = (message: string) => {
//     const alertContainer = document.createElement('div');
//     alertContainer.className = 'custom-alert';
    
//     alertContainer.innerHTML = `
//       <div class="custom-alert-content">
//         <p>${message}</p>
//         <button class="custom-alert-close">OK</button>
//       </div>
//     `;
    
//     document.body.appendChild(alertContainer);
    
//     const closeButton = alertContainer.querySelector('.custom-alert-close');
//     if (closeButton) {
//       closeButton.addEventListener('click', () => {
//         alertContainer.remove();
//       });
//     }

//     setTimeout(() => {
//       alertContainer.remove();
//     }, 3000);
//   };

//   return (
//     <div className="image-generation-container">
//       <motion.div 
//         className="image-generation-header"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h1 className="image-generation-title">AI Image Generation</h1>
//         <p className="image-generation-subtitle">
//           Create stunning images with the power of AI. Just describe what you want to see.
//         </p>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//       >
//         <form onSubmit={handleSubmit} className="image-generation-form">
//           <div className="mb-6">
//             <label htmlFor="prompt" className="block mb-2 text-sm font-medium text-gray-300">
//               Describe the image you want to create
//             </label>
//             <textarea
//               id="prompt"
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder="A futuristic city with flying cars and neon lights..."
//               className="w-full px-4 py-3 text-white transition-all bg-gray-900 bg-opacity-50 border border-gray-700 resize-none rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//               rows={4}
//               required
//             />
//           </div>
          
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             type="submit"
//             className="flex items-center justify-center w-full gap-2 px-6 py-3 font-medium text-white transition-all bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
//             disabled={isGenerating}
//           >
//             {isGenerating ? (
//               <>
//                 <RefreshCw className="w-5 h-5 animate-spin" />
//                 Generating...
//               </>
//             ) : (
//               <>
//                 <Sparkles className="w-5 h-5" />
//                 Generate Image
//               </>
//             )}
//           </motion.button>
//         </form>
//       </motion.div>

//       {generatedImages.length > 0 && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.4 }}
//           className="mt-12"
//         >
//           <h2 className="mb-6 text-2xl font-bold text-white">Your Generated Images</h2>
//           <div className="image-grid">
//             {generatedImages.map((item, index) => (
//               <motion.div
//                 key={index}
//                 className="image-card"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: index * 0.1 }}
//                 whileHover={{ y: -5, scale: 1.02 }}
//               >
//                 <img 
//                   src={item.imageUrl} 
//                   alt={item.prompt} 
//                   className="image-card-img"
//                 />
//                 <div className="image-card-content">
//                   <p className="image-card-prompt">{item.prompt}</p>
//                   <div className="image-card-actions">
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => handleCopyPrompt(item.prompt)}
//                       className="image-card-btn"
//                       title="Copy prompt"
//                     >
//                       <Copy size={16} />
//                     </motion.button>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => handleDownload(item.imageUrl)}
//                       className="image-card-btn"
//                       title="Download image"
//                     >
//                       <Download size={16} />
//                     </motion.button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default ImageGeneratePage;



import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {  Download, Copy, Sparkles, RefreshCw } from 'lucide-react';

const ImageGeneratePage = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<{ prompt: string; imageUrl: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    
    try {
      const response = await fetch('https://lexa-backend-tau.vercel.app/api/generateImage', {  // Match original backend endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      
      setGeneratedImages([
        { prompt, imageUrl },
        ...generatedImages
      ]);
      setPrompt('');
    } catch (error) {
      console.error('Error generating image:', error);
      setError('Failed to generate image. Please try again.');
      showCustomAlert('Error: Failed to generate image.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `lexa-generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link)
  };

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    showCustomAlert('Prompt copied to clipboard!');
  };

  const showCustomAlert = (message: string) => {
    const alertContainer = document.createElement('div');
    alertContainer.className = 'custom-alert';
    
    alertContainer.innerHTML = `
      <div class="custom-alert-content">
        <p>${message}</p>
        <button class="custom-alert-close">OK</button>
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
    }, 6000);
  };

  // Cleanup blob URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      generatedImages.forEach(item => {
        URL.revokeObjectURL(item.imageUrl);
      });
    };
  }, [generatedImages]);

  return (
    <div className="image-generation-container">
      <motion.div 
        className="image-generation-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="image-generation-title">AI Image Generation</h1>
        <p className="image-generation-subtitle">
          Create stunning images with the power of AI. Just describe what you want to see.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="image-generation-form">
          <div className="mb-6">
            <label htmlFor="prompt" className="block mb-2 text-sm font-medium text-gray-300">
              Describe the image you want to create
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A futuristic city with flying cars and neon lights..."
              className="w-full px-4 py-3 text-white transition-all bg-gray-900 bg-opacity-50 border border-gray-700 resize-none rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              rows={4}
              required
            />
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-500">{error}</div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="flex items-center justify-center w-full gap-2 px-6 py-3 font-medium text-white transition-all bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Image
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

      {generatedImages.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="mb-6 text-2xl font-bold text-white">Your Generated Images</h2>
          <div className="image-grid">
            {generatedImages.map((item, index) => (
              <motion.div
                key={index}
                className="image-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.prompt} 
                  className="image-card-img"
                />
                <div className="image-card-content">
                  <p className="image-card-prompt">{item.prompt}</p>
                  <div className="image-card-actions">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCopyPrompt(item.prompt)}
                      className="image-card-btn"
                      title="Copy prompt"
                    >
                      <Copy size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDownload(item.imageUrl)}
                      className="image-card-btn"
                      title="Download image"
                    >
                      <Download size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ImageGeneratePage;