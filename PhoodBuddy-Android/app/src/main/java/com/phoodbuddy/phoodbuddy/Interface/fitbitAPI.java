package com.phoodbuddy.phoodbuddy.Interface;

import com.phoodbuddy.phoodbuddy.Models.Fitbit;

import retrofit.Callback;
import retrofit.http.Body;
import retrofit.http.Header;
import retrofit.http.Headers;
import retrofit.http.POST;
import retrofit.http.Query;

/**
 * Created by Evan Glazer on 4/18/2016.
 */
public interface fitbitAPI {
    @Headers("Authorization: 0808955b42f81e0d5092a299fe543b77")

   @POST("/oauth2/token")
    void getToken(
            @Query("client_id") String client_id,
                  @Query("grant_type") String type,
                  @Query("code") String code,
                  @Query(value = "redirect_uri", encodeValue = true) String redirect,
                  @Body String body,
                  Callback<Fitbit> callback);

}
