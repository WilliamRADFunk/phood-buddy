package com.phoodbuddy.phoodbuddy.Models;

/**
 * Created by Evan Glazer on 4/18/2016.
 */

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;


public class Fitbit {

    @SerializedName("access_token")
    @Expose
    private String accessToken;
    @SerializedName("expires_in")
    @Expose
    private int expiresIn;
    @SerializedName("refresh_token")
    @Expose
    private String refreshToken;
    @SerializedName("token_type")
    @Expose
    private String tokenType;
    @SerializedName("user_id")
    @Expose
    private String userId;

    /**
     *
     * @return
     * The accessToken
     */
    public String getAccessToken() {
        return accessToken;
    }

    /**
     *
     * @param accessToken
     * The access_token
     */
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    /**
     *
     * @return
     * The expiresIn
     */
    public int getExpiresIn() {
        return expiresIn;
    }

    /**
     *
     * @param expiresIn
     * The expires_in
     */
    public void setExpiresIn(int expiresIn) {
        this.expiresIn = expiresIn;
    }

    /**
     *
     * @return
     * The refreshToken
     */
    public String getRefreshToken() {
        return refreshToken;
    }

    /**
     *
     * @param refreshToken
     * The refresh_token
     */
    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    /**
     *
     * @return
     * The tokenType
     */
    public String getTokenType() {
        return tokenType;
    }

    /**
     *
     * @param tokenType
     * The token_type
     */
    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    /**
     *
     * @return
     * The userId
     */
    public String getUserId() {
        return userId;
    }

    /**
     *
     * @param userId
     * The user_id
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }

}