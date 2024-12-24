/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container:{
      center:true
    },
    extend: {
    
      colors:{
        primary:{
          50:"#ffffff",
          100:"#e7f7e7",
          200:"#ceefce",
          300:"#b6e6b6",
          400:"#9dde9d",
          500:"#85d685",
          600:"#6cce6c",
          700:"#54c654",
          800:"#3bbd3b",
          900:"#23b523",
          950:"#0aad0a",
          
        }
      },
      fontFamily:{
        cairo:"Cairo Variable",
      },
      screens:{
        "2xl": "1200px"
      }
      
    },
  },
  plugins: [],
}

