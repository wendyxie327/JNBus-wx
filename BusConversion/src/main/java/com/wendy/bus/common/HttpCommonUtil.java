package com.wendy.bus.common;

import java.util.HashMap;
import java.util.Map;

public class HttpCommonUtil {

    private static Map<String, String> httpHeaders;

    public static Map<String, String> getHttpHeaders(){
        if (httpHeaders == null){
            httpHeaders = new HashMap<>();
            httpHeaders.put("Content-type", "application/json;charset=utf-8");
            httpHeaders.put("version", "android-insigma.waybook.jinan-2342");
            httpHeaders.put("User-Agent","Mozilla/5.0 (Linux; U; Android 4.4.1; zh-cn; GT-S5660 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1 MicroMessenger/4.5.255");
        }

        return httpHeaders;
    }
}
