from rest_framework.response import Response
from rest_framework import status
from .models import Employee, User
from rest_framework.views import APIView
from .serializers import ListSerializer, UserRegisterSerializer, UserLoginSerializer


# Create your views here.


class ListAndCreateAPI(APIView):

    def get(self, request):
        print(request.headers)
        print(request.user)
        results = Employee.objects.all()

        serializer = ListSerializer(results, many=True)

        return Response(serializer.data)

    def patch(self, request):

        serializer = ListSerializer(data=request.data)

        print(request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SingleObjectAPI(APIView):

    def get(self, request, pk):

        try:
            result = Employee.objects.get(pk=pk)

            serializer = ListSerializer(result)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Employee.DoesNotExist:
            return Response(
                {"ERROR": "Data does not exists"}, status=status.HTTP_404_NOT_FOUND
            )

        except Exception as e:
            return Response(
                {"ERROR": f"An unexpected error occurs: {e}"},
                status=status.HTTP_404_NOT_FOUND,
            )


class UserLoginAPI(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = User.objects.get(email=email, password=password)

            serializer = UserLoginSerializer(user)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )

        except Exception as e:
            return Response(
                {"error": f"An unexpected error occurred: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class UserRegisterAPI(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)

        print(request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
