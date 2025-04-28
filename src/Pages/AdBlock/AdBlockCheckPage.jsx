import React, { useEffect, useState } from 'react';
import { Container, Alert, Spinner, Button } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

const AdBlockCheck = () => {
  const [searchParams] = useSearchParams();
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  const [checking, setChecking] = useState(true);
  const redirectUrl = searchParams.get('link');

  useEffect(() => {
    const testScript = document.createElement('script');
    testScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    testScript.async = true;

    // If script fails to load → AdBlock detected
    testScript.onerror = () => {
      setAdBlockDetected(true);
      setChecking(false);
    };

    // If script loads fine → No AdBlock
    testScript.onload = () => {
      window.location.href = redirectUrl;
    };

    document.body.appendChild(testScript);

    // Optional timeout fallback
    const fallback = setTimeout(() => {
      if (checking) {
        setAdBlockDetected(true);
        setChecking(false);
      }
    }, 3000);

    return () => {
      clearTimeout(fallback);
      document.body.removeChild(testScript);
    };
  }, [redirectUrl]);

  return (
    <Container className="text-center mt-5">
      <h2 className="mb-3 text-white">Checking your browser...</h2>
      {checking && <Spinner animation="border" style={{ color: "white" }} />}
      {!checking && adBlockDetected && (
        <>
          <Alert variant="danger">
            <strong>AdBlock detected!</strong><br />
            Please disable your ad blocker to continue to the download page.
          </Alert>
          <Button className='mt-2' onClick={() => window.location.reload()}>Refresh Page</Button>
        </>
      )}
    </Container>
  );
};

export default AdBlockCheck;
