package com.example.CarrerLink_backend.service.impl;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

@Service
@AllArgsConstructor
public class JWTService {
    private final SecretKey secretKey;

    public JWTService(){
        try{
            SecretKey k = KeyGenerator.getInstance("HmacSHA256").generateKey();
            secretKey = Keys.hmacShaKeyFor(k.getEncoded());
        }
        catch (Exception e){
            throw new RuntimeException("Failed to generate secret key",e);
        }
    }
    public String getJWTToken(String username, Map<String,Object> claims){
        return Jwts.builder()
                .claims(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000*60*30))
                .signWith(secretKey)
                .compact();
    }

    public Claims getTokenData(String token){
        try {
            return Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (ExpiredJwtException ex) {
            // Log expiration to console
            System.out.println("❌ Token expired at: " + ex.getClaims().getExpiration());
            return null;
        } catch (Exception e) {
            // Other errors (e.g., invalid signature)
            System.out.println("❌ Token validation error: " + e.getMessage());
            return null;
        }

    }

    public String getUsername(String token){
      Claims data = getTokenData(token);
      if(data == null) return null;
      return data.getSubject();
    }

    public Object getFieldFromToken(String token,String key){
        Claims data = getTokenData(token);
        if(data == null) return null;
        return data.get(key);
    }


}
