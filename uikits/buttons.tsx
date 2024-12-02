import React, { ButtonHTMLAttributes } from "react";

type ButtonVariant = "normal" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant; // Style du bouton
  isLoading?: boolean; // Indicateur de chargement
  icon?: React.ReactNode; // Icône optionnelle
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  icon,
  disabled,
  ...rest
}) => {
  const buttonClass = `btn btn-${variant} ${
    disabled || isLoading ? "btn-disabled" : ""
  }`;

  return (
    <button
      className={buttonClass}
      disabled={disabled || isLoading} // Désactive le bouton si `disabled` ou `isLoading`
      {...rest}
    >
      {/* Icône ou chargement */}
      {isLoading ? (
        <span className="btn-spinner">...</span>
      ) : (
        icon && <span className="btn-icon">{icon}</span>
      )}
      {children}
    </button>
  );
};
