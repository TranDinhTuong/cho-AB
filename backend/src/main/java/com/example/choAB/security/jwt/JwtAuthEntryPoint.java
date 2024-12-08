package com.example.choAB.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtAuthEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException)
            throws IOException, ServletException
    {
        response.setContentType(MediaType.APPLICATION_JSON_VALUE); // Thiết lập loại dữ liệu phản hồi là JSON (application/json) để trả về thông tin lỗi dưới dạng JSON.
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // Đặt mã trạng thái phản hồi là 401 Unauthorized, cho biết người dùng chưa được xác thực hoặc không có quyền truy cập tài nguyên.

        //Tạo body phản hồi
        final Map<String, Object> body = new HashMap<>(); //để chứa các thông tin lỗi, trong trường hợp này bao gồm:
        // body.put("status", HttpServletResponse.SC_UNAUTHORIZED);
        body.put("error", "Unauthorized"); //Mô tả loại lỗi là "Unauthorized" (Chưa được xác thực
        body.put("message", "You may login and try again!"); //Thông báo gợi ý cho người dùng rằng họ cần đăng nhập lại để thử lại.
        /// body.put("path", request.getServletPath());

        //Sử dụng ObjectMapper của Jackson để chuyển đổi map chứa thông tin lỗi thành JSON và ghi vào phản hồi HTTP (response.getOutputStream()).
        final ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(response.getOutputStream(), body);
    }
}
