# Clients and Policies - Introduction

This nodejs app is a middleware bettween the mocks:

* Clients : [http://www.mocky.io/v2/5808862710000087232b75ac](http://www.mocky.io/v2/5808862710000087232b75ac)
* Their policies : [http://www.mocky.io/v2/580891a4100000e8242b75c5](http://www.mocky.io/v2/580891a4100000e8242b75c5)

All request've the next structure :

{% api-method method="options" host="" path="" %}
{% api-method-summary %}
General request
{% endapi-method-summary %}

{% api-method-description %}
The general parameters that must be in all login required request is the Authorization Bearer token
{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="Authentication" type="string" required=true %}
Bearer &lt;TOKEN&gt;  
Authentication token to track down who is emptying our stocks.
{% endapi-method-parameter %}
{% endapi-method-headers %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=200 %}
{% api-method-response-example-description %}
Successfully or failure retrieved.
{% endapi-method-response-example-description %}

```
{    
  "status": "success" or "error",  
  "data": {} or []
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=401 %}
{% api-method-response-example-description %}
Unauthorized or token not provided
{% endapi-method-response-example-description %}

```
{    
  "status": "error",  
  "error": {
    "message" : "Unauthorised access, please identify yourself and use the Authorization: Bearer <TOKEN> header" or "Access only for administrators"
  }
}
```
{% endapi-method-response-example %}

{% api-method-response-example httpCode=404 %}
{% api-method-response-example-description %}
Could not find a cake matching this query.
{% endapi-method-response-example-description %}

```
{    
  "status": "error",  
  "error": {
    "message" : url.path + " not found"
  }
}
```
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}

