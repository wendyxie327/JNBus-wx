package com.wendy.bus.controller;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"file:src/main/webapp/WEB-INF/config/spring/spring-web.xml"})
public class ConversionControllerTest {

    private static final String commonUrl = "/restful/conversion";
    private MockMvc mockMvc;
    @InjectMocks//使mock对象的使用类可以注入mock对象,在这里myController使用了testService（mock对象）,所以在MyController此加上此Annotate
    private ConversionController conversionController;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        this.mockMvc = MockMvcBuilders.standaloneSetup(conversionController).build();//这个对象是Controller单元测试的关键
    }

    @Test
    public void queryBusList() throws Exception {
        mockMvc.perform((get(commonUrl + "/queryBusList/1/0/20"))
                .accept(MediaType.parseMediaType("application/json;charset=UTF-8")))
                .andDo(print());
    }

    @Test
    public void queryBusCurrentDetail() throws Exception {
        mockMvc.perform((get(commonUrl + "/queryBusCurrentDetail/577"))
                .accept(MediaType.parseMediaType("application/json;charset=UTF-8")))
                .andDo(print());
    }

    @Test
    public void queryBusStations() throws Exception {
        mockMvc.perform((get(commonUrl + "/queryBusStations/577"))
                .accept(MediaType.parseMediaType("application/json;charset=UTF-8")))
                .andDo(print());
    }

    @Test
    public void queryBusStationsReverse() throws Exception {
        mockMvc.perform((get(commonUrl + "/queryBusStationsReverse/577"))
                .accept(MediaType.parseMediaType("application/json;charset=UTF-8")))
                .andDo(print());
    }
}