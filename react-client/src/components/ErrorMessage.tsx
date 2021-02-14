import React from 'react';

const ErrorMessage = ({ text }: { text: string}) => <div className="text-danger">&lowast; {text}</div>;

export default ErrorMessage;
