package com.wendy.bus.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.http.HttpEntity;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.util.EntityUtils;


public class HttpServletUtil {

    public static void main(String[] args) {
        String result = null;
        try {
            Map<String, String> headers = new HashMap<>();
//            headers.put("Content-type", "application/json;charset=utf-8");
            headers.put("User-Agent","Mozilla/5.0 (Linux; U; Android 4.4.1; zh-cn; GT-S5660 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1 MicroMessenger/4.5.255");
            result = sendHttpGet("http://60.216.101.229/server-ue2/rest/buslines/simple/370100/1/0/20", null, headers);
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("result = " + result);
    }

    /**
     * 发送Get
     *
     * @param url
     * @param mapParam
     * @return
     * @throws ClientProtocolException
     * @throws IOException
     */
    public static String sendHttpGet(String url, Map<String, String> mapParam, Map<String, String> headers) throws ClientProtocolException, IOException {
        String strResult = null;
        StringBuffer paramBuff = new StringBuffer("");
        String newUrl;

        if (mapParam != null) {
            for (Iterator<String> i = mapParam.keySet().iterator(); i.hasNext(); ) {
                String paramKey = i.next();
                String paramValue = mapParam.get(paramKey);
                paramBuff.append(paramKey + "=" + paramValue + "&");
            }
            newUrl = url + "?" + paramBuff.toString();
        }else {
            newUrl = url;
        }
        System.out.println("url = "+newUrl);

        // 发送请求
        CloseableHttpClient httpclient = HttpClients.createDefault();
        HttpGet request = new HttpGet(newUrl);

        if (headers != null && headers.size() > 0){
            for (Iterator<String> i = headers.keySet().iterator(); i.hasNext(); ) {
                String paramKey = i.next();
                String paramValue = headers.get(paramKey);
                request.addHeader(paramKey, paramValue);
            }
        }
        CloseableHttpResponse httpResponse = httpclient.execute(request);
        if (httpResponse.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
            //取得返回的字符串
            strResult = EntityUtils.toString(httpResponse.getEntity(), "GBK");
        }
        return strResult;
    }

    /**
     * 发送post请求，请求参数必须为json
     *
     * @param url         请求地址
     * @param jsonContent 请求内容
     * @return
     * @throws ClientProtocolException
     * @throws IOException
     */
    public static String sendHttpPost(String url, String jsonContent) throws ClientProtocolException, IOException {
        String strResult = null;

        CloseableHttpClient httpclient = HttpClients.createDefault();
        // HttpPost连接对象
        HttpPost httpRequest = new HttpPost(url);
        // 设置字符集
        StringEntity httpentity = new StringEntity(jsonContent, "UTF-8");
        httpentity.setContentType("application/json");
        // 请求httpRequest
        httpRequest.setEntity(httpentity);
        // 发送请求
        CloseableHttpResponse httpResponse = httpclient.execute(httpRequest);

        if (httpResponse.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
            // 取得返回的字符串
            strResult = EntityUtils.toString(httpResponse.getEntity(), "UTF-8");
        } else {
            System.err.println("httpResponse.getStatusLine().getStatusCode() = " + httpResponse.getStatusLine().getStatusCode());
            httpRequest.abort();
        }

        return strResult;
    }


    public static String sendHttpPost(String url, Map<String, String> mapParam) throws ClientProtocolException, IOException {
        String strResult = null;

        //使用NameValuePair来保存要传递的Post参数
        List<NameValuePair> params = new ArrayList<NameValuePair>();
        //添加要传递的参数
        for (Iterator<String> i = mapParam.keySet().iterator(); i.hasNext(); ) {
            String paramKey = i.next();
            String paramValue = mapParam.get(paramKey);
            params.add(new BasicNameValuePair(paramKey, paramValue));
        }

        CloseableHttpClient httpclient = HttpClients.createDefault();
        //HttpPost连接对象
        HttpPost httpRequest = new HttpPost(url);
        //设置字符集
        HttpEntity httpentity = new UrlEncodedFormEntity(params, "UTF-8");
        //请求httpRequest
        httpRequest.setEntity(httpentity);
        // 发送请求
        CloseableHttpResponse httpResponse = httpclient.execute(httpRequest);
        //设置请求的参数 超时时间
        BasicHttpParams httpParams = new BasicHttpParams();
        HttpConnectionParams.setConnectionTimeout(httpParams, 20 * 1000);
        HttpConnectionParams.setSoTimeout(httpParams, 20 * 1000);

        if (httpResponse.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
            //取得返回的字符串
            strResult = EntityUtils.toString(httpResponse.getEntity(), "UTF-8");
        }

        return strResult;
    }

}
