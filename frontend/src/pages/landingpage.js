```javascript
     import React from 'react';

     const LandingPage = () => {
       return (
         <div>
           <header>
             <h1>Welcome to Shelter</h1>
             <nav>
               <a href="/properties">Properties</a>
               <a href="/login">Login</a>
               <a href="/signup">Sign Up</a>
             </nav>
           </header>
           <section>
             <h2>Find Your Perfect Property</h2>
             <p>Discover the best properties for lease or purchase.</p>
           </section>
           <section>
             <h2>Featured Properties</h2>
             {/* Add featured properties here */}
           </section>
           <section>
             <h2>Testimonials</h2>
             {/* Add testimonials here */}
           </section>
           <footer>
             <p>&copy; 2024 Shelter. All rights reserved.</p>
           </footer>
         </div>
       );
     };

     export default LandingPage;
