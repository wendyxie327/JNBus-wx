package com.wendy.bus.controller;

import com.wendy.bus.common.HttpCommonUtil;
import com.wendy.bus.util.HttpServletUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

@Controller
@RequestMapping(value = "/restful/conversion")
public class ConversionController {

    @RequestMapping(value = "/queryBusList/{bus}/0/20", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String queryBusList(@PathVariable("bus") String bus) {
        String url = "http://60.216.101.229/server-ue2/rest/buslines/simple/370100";
        url = url + "/" + bus + "/0/20";
        String result = null;
        try {
            result = HttpServletUtil.sendHttpGet(url, null, HttpCommonUtil.getHttpHeaders());
            System.out.println(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }



    @RequestMapping(value = "/queryBusCurrentDetail/{busId}", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String queryBusCurrentDetail(@PathVariable("busId") String busId) {
        String url = "http://60.216.101.229/server-ue2/rest/buses/busline/370100";
        url = url + "/" + busId ;
        String result = null;
        try {
            result = HttpServletUtil.sendHttpGet(url, null, HttpCommonUtil.getHttpHeaders());
            System.out.println(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }

    @RequestMapping(value = "/queryBusStations/{busId}", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String queryBusStations(@PathVariable("busId") String busId) {
        String url = "http://60.216.101.229/server-ue2/rest/buslines/370100";
        url = url + "/" + busId ;
        String result = null;
        try {
            result = HttpServletUtil.sendHttpGet(url, null, HttpCommonUtil.getHttpHeaders());
            System.out.println(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }


    @RequestMapping(value = "/queryBusStationsReverse/{busId}", produces = "application/json; charset=utf-8")
    @ResponseBody
    public String queryBusStationsReverse(@PathVariable("busId") String busId) {
        String url = "http://60.216.101.229/server-ue2/rest/buslines/theOtherDirection/370100";
        url = url + "/" + busId ;
        String result = null;
        try {
            result = HttpServletUtil.sendHttpGet(url, null, HttpCommonUtil.getHttpHeaders());
            System.out.println(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }
}
