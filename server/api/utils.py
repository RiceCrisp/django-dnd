from rest_framework_simplejwt.authentication import JWTAuthentication


def getJWTUser(request):
    jwt = JWTAuthentication()
    header = jwt.get_header(request)
    if (header):
        raw_token = jwt.get_raw_token(header)
        token = jwt.get_validated_token(raw_token)
        return jwt.get_user(token)
    return None
