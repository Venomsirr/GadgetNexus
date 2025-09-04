
document.addEventListener('DOMContentLoaded', function(){
  // simple fade-in for sections
  document.querySelectorAll('.section').forEach((s, i) => {
    s.style.opacity = 0;
    s.style.transform = 'translateY(18px)';
    setTimeout(()=>{ s.style.transition='all .6s ease'; s.style.opacity=1; s.style.transform='translateY(0)' }, 220 + i*120);
  });

  // Order buttons open whatsapp catalog
  document.querySelectorAll('.order-now').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const wa = btn.dataset.wa || 'https://wa.me/c/27719679307';
      window.open(wa, '_blank');
    });
  });
});
