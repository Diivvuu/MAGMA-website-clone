function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
loco()


var clutter = ""
document.querySelector("#page2>h1").textContent.split("").forEach(function(dets){
  clutter += `<span>${dets}</span>`

  document.querySelector("#page2>h1").innerHTML = clutter;
})

gsap.to("#page2>h1>span",{
  scrollTrigger:{
      trigger:'#page2>h1>span',
      start: '50% 100%',
      end:'90% 50%',
      scroller:'#main',
      // markers: true,
      scrub:2,
  },
  stagger:.5,
  color:`#fff`
})

function canvas(){
  const canvas = document.querySelector("#page3>canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
render();
});

function files(index) {
var data = `
./Assets/frames00007.png
./Assets/frames00010.png
./Assets/frames00013.png
./Assets/frames00016.png
./Assets/frames00019.png
./Assets/frames00022.png
./Assets/frames00025.png
./Assets/frames00028.png
./Assets/frames00031.png
./Assets/frames00034.png
./Assets/frames00037.png
./Assets/frames00040.png
./Assets/frames00043.png
./Assets/frames00046.png
./Assets/frames00049.png
./Assets/frames00052.png
./Assets/frames00055.png
./Assets/frames00058.png
./Assets/frames00061.png
./Assets/frames00064.png
./Assets/frames00067.png
./Assets/frames00070.png
./Assets/frames00073.png
./Assets/frames00076.png
./Assets/frames00079.png
./Assets/frames00082.png
./Assets/frames00085.png
./Assets/frames00088.png
./Assets/frames00091.png
./Assets/frames00094.png
./Assets/frames00097.png
./Assets/frames00100.png
./Assets/frames00103.png
./Assets/frames00106.png
./Assets/frames00109.png
./Assets/frames00112.png
./Assets/frames00115.png
./Assets/frames00118.png
./Assets/frames00121.png
./Assets/frames00124.png
./Assets/frames00127.png
./Assets/frames00130.png
./Assets/frames00133.png
./Assets/frames00136.png
./Assets/frames00139.png
./Assets/frames00142.png
./Assets/frames00145.png
./Assets/frames00148.png
./Assets/frames00151.png
./Assets/frames00154.png
./Assets/frames00157.png
./Assets/frames00160.png
./Assets/frames00163.png
./Assets/frames00166.png
./Assets/frames00169.png
./Assets/frames00172.png
./Assets/frames00175.png
./Assets/frames00178.png
./Assets/frames00181.png
./Assets/frames00184.png
./Assets/frames00187.png
./Assets/frames00190.png
./Assets/frames00193.png
./Assets/frames00196.png
./Assets/frames00199.png
./Assets/frames00202.png
`;
return data.split("\n")[index];
}

const frameCount = 67;

const images = [];
const imageSeq = {
frame: 1,
};

for (let i = 0; i < frameCount; i++) {
const img = new Image();
img.src = files(i);
images.push(img);
}

gsap.to(imageSeq, {
frame: frameCount - 1,
snap: "frame",
ease: `none`,
scrollTrigger: {
  scrub: .5,
  trigger: `#page3`,
  start: `top top`,
  end: `250% top`,
  scroller: `#main`,
},
onUpdate: render,
});

images[1].onload = render;

function render() {
scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
var canvas = ctx.canvas;
var hRatio = canvas.width / img.width;
var vRatio = canvas.height / img.height;
var ratio = Math.max(hRatio, vRatio);
var centerShift_x = (canvas.width - img.width * ratio) / 2;
var centerShift_y = (canvas.height - img.height * ratio) / 2;
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(
  img,
  0,
  0,
  img.width,
  img.height,
  centerShift_x,
  centerShift_y,
  img.width * ratio,
  img.height * ratio
);
}
ScrollTrigger.create({

trigger: "#page3",
pin: true,
scroller: `#main`,
start: `top top`,
end: `250% top`,
});
}
canvas()
