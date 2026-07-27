import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  className?: string;
}

export function Button({ children, href, variant = 'primary', className = '' }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center px-8 py-5 text-sm tracking-wide uppercase transition-all duration-300 font-bold rounded-2xl shadow-xl active:scale-95";
  
  const variants = {
    primary: "bg-aj-orange text-white hover:bg-aj-brown shadow-orange-200",
    secondary: "bg-aj-brown text-white hover:bg-aj-orange shadow-orange-900/20",
    outline: "border-2 border-aj-brown text-aj-brown hover:bg-aj-brown hover:text-white shadow-transparent",
    dark: "bg-aj-dark text-white hover:bg-aj-brown shadow-gray-200"
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <motion.a whileHover={{ scale: 1.02 }} href={href} className={classes}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button whileHover={{ scale: 1.02 }} className={classes}>
      {children}
    </motion.button>
  );
}
