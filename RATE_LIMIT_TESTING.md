# Rate Limiting Test Script

## Test Authentication Rate Limiting

You can test the rate limiting by making multiple requests to the authentication endpoints:

### Test Login Rate Limiting (5 attempts per 15 minutes)

```bash
# Using curl (run this multiple times quickly)
curl -X POST http://localhost:8001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"wrongpassword"}'
```

### Test Signup Rate Limiting (3 attempts per hour)

```bash
# Using curl (run this multiple times quickly)
curl -X POST http://localhost:8001/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"Test123456","confirmPassword":"Test123456"}'
```

### Expected Response When Rate Limited

```json
{
  "error": "Too many authentication attempts",
  "message": "Too many authentication attempts from this IP, please try again after 15 minutes.",
  "retryAfter": "15 minutes",
  "timestamp": "2025-10-30T10:30:00.000Z"
}
```

### Rate Limit Headers

When making requests, you'll see these headers:

```
RateLimit-Limit: 5
RateLimit-Remaining: 4
RateLimit-Reset: 1635602400
```

## Testing with JavaScript (Frontend)

```javascript
// Test function to check rate limiting
async function testRateLimit() {
  const url = 'http://localhost:8001/auth/login';
  const data = {
    email: 'test@test.com',
    password: 'wrongpassword'
  };

  for (let i = 1; i <= 7; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      const rateLimitRemaining = response.headers.get('RateLimit-Remaining');
      
      console.log(`Attempt ${i}:`);
      console.log(`Status: ${response.status}`);
      console.log(`Rate Limit Remaining: ${rateLimitRemaining}`);
      console.log(`Response:`, result);
      console.log('---');
      
      if (response.status === 429) {
        console.log('Rate limit exceeded!');
        break;
      }
    } catch (error) {
      console.error(`Attempt ${i} failed:`, error);
    }
  }
}

// Run the test
testRateLimit();
```

## Rate Limiting Verification

To verify rate limiting is working:

1. **Make rapid requests** to any auth endpoint
2. **Check response headers** for rate limit info
3. **Observe 429 status** when limit exceeded
4. **Wait for window reset** and try again

The rate limiting is now protecting your authentication endpoints from brute force attacks!