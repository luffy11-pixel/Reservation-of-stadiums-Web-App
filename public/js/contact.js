 // Form submission handler
 document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    alert('Thank you for your message! We will respond within 24 hours.');
    this.reset();
  });