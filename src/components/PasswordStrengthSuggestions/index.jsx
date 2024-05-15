import "./password-strength-suggestions.scss";

export default function PasswordStrengthSuggestions({ suggestions }) {
    return (
        <ul className="PasswordStrengthSuggestions">
            {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
            ))}
        </ul>
    )
}