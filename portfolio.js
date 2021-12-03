        //constante cubes
        const COLOR_BG = "#061623";
        const COLOR_CUBE = "orange";
        const SPEED_X = 0.05;
        const SPEED_Y = 0.15;
        const SPEED_Z = 0.10;
        const POINT3D = function(x, y ,z) { this.x = x; this.y = y; this.z = z; };
        
        // set up du canvas
        var canvas = document.querySelector("canvas");
        var ctx = canvas.getContext("2d");
        
        //dimensions
        var h = 200;
        var w = 200;
        
        
        canvas.height = h;
        canvas.width = w; 
        
        //coleurs and lines 
        ctx.fillStyle = COLOR_BG;
        ctx.strokeStyle = COLOR_CUBE;
        ctx.lineWidth = w / 100;
        ctx.lineCap = "round" ;
        
        //dimension du cube
        var cx = w / 2 ; 
        var cy = h / 2 ;
        var cz = 0;
        var size = h / 4;
        var vertices = [
            new POINT3D(cx  - size, cy - size, cz - size),
            new POINT3D(cx  + size, cy - size, cz - size),
            new POINT3D(cx  + size, cy + size, cz - size),
            new POINT3D(cx  - size, cy + size, cz - size),
            new POINT3D(cx  - size, cy - size, cz + size),
            new POINT3D(cx  + size, cy - size, cz + size),
            new POINT3D(cx  + size, cy + size, cz + size),
            new POINT3D(cx  - size, cy + size, cz + size),
        ];
        
        var edges = [
            [0, 1], [1, 2], [2, 3], [3, 0], // face arriere 
            [4, 5], [5, 6], [6, 7], [7, 4], // face avant 
            [0, 4], [1, 5], [2, 6], [3, 7] //connection des coter
        ];
        
         // set up the animation loop 
         var  timeDelta, timeLast = 0;
         requestAnimationFrame(loop);
        
         function loop(timeNow) {
             //diference de timer
         timeDelta = timeNow - timeLast;
         timeLast = timeNow;
        
          //background
          ctx.fillRect(0, 0, w, h);
        
          //rotation du cube sur axe Z
          let angle = timeDelta * 0.001 * SPEED_Z * Math.PI * 2;
          for (let v of vertices) {
              let dx = v.x - cx;
              let dy = v.y - cy;
              let x = dx * Math.cos(angle) - dy * Math.sin(angle);
              let y = dx * Math.sin(angle) + dy * Math.cos(angle);
              v.x = x + cx;
              v.y = y + cy;
          }
          //rotation du cube sur axe X
           angle = timeDelta * 0.001 * SPEED_X * Math.PI * 2;
          for (let v of vertices) {
              let dy = v.y - cy;
              let dz = v.z - cz;
              let y = dy * Math.cos(angle) - dz * Math.sin(angle);
              let z = dy * Math.sin(angle) + dz * Math.cos(angle);
              v.y = y + cy;
              v.z = z + cz;
          }
        
        
          // draw each edge
          for (let edge of edges) {
              ctx.beginPath();
              ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
              ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
              ctx.stroke();
          }
          //appeler next frame
          requestAnimationFrame(loop);
        }