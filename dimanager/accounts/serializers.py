from rest_framework import serializers
from shifts.serializers import ModalitySerializer
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate




#USER SERIALIZERS
class UserSerializer(serializers.ModelSerializer):
    modalities = ModalitySerializer(many=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'modalities')

#REGISTER SERIALIZERS
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username','email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

        return user


#LOGIN SERIALIZER
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
        

