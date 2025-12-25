export default function RotatingCube() {
  return (
    <div className="cube-container h-[400px] flex items-center justify-center">
      <div className="cube relative w-[200px] h-[200px]">
        {/* Front Face */}
        <div 
          className="cube-face rounded-lg"
          style={{ transform: 'translateZ(100px)' }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-4xl gradient-text font-bold">AI</span>
          </div>
        </div>
        
        {/* Back Face */}
        <div 
          className="cube-face rounded-lg"
          style={{ transform: 'rotateY(180deg) translateZ(100px)' }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-4xl gradient-text font-bold">ML</span>
          </div>
        </div>
        
        {/* Right Face */}
        <div 
          className="cube-face rounded-lg"
          style={{ transform: 'rotateY(90deg) translateZ(100px)' }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-4xl gradient-text font-bold">DL</span>
          </div>
        </div>
        
        {/* Left Face */}
        <div 
          className="cube-face rounded-lg"
          style={{ transform: 'rotateY(-90deg) translateZ(100px)' }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-4xl gradient-text font-bold">CV</span>
          </div>
        </div>
        
        {/* Top Face */}
        <div 
          className="cube-face rounded-lg"
          style={{ transform: 'rotateX(90deg) translateZ(100px)' }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-4xl gradient-text font-bold">NLP</span>
          </div>
        </div>
        
        {/* Bottom Face */}
        <div 
          className="cube-face rounded-lg"
          style={{ transform: 'rotateX(-90deg) translateZ(100px)' }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-3xl gradient-text font-bold">PG</span>
          </div>
        </div>
      </div>
    </div>
  );
}
