from rest_framework.response import Response
from rest_framework import status
from .models import Employee, User
from rest_framework.views import APIView
from .serializers import ListSerializer, UserRegisterSerializer, UserLoginSerializer
import json

# Create your views here.


def getToken(request):
    print(request.headers["Authorization"][7:])
    token = json.loads(request.headers["Authorization"][7:])


class ListAndCreateAPI(APIView):

    def get(self, request):
        results = Employee.objects.all()

        serializer = ListSerializer(results, many=True)

        return Response(serializer.data)

    def patch(self, request):

        # if getToken(request).get("role") != "admin":
        #     return Response(
        #         {"message": "Unauthorized Access"}, status=status.HTTP_401_UNAUTHORIZED
        #     )

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

    def get_object(self, pk):
        try:
            result = Employee.objects.get(pk=pk)
            return result

        except Employee.DoesNotExist:
            return Response(
                {"ERROR": "Data does not exists"}, status=status.HTTP_404_NOT_FOUND
            )

        except Exception as e:
            return Response(
                {"ERROR": f"An unexpected error occurs: {e}"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def patch(self, request, pk):

        # if getToken(request).get("role") != "admin":
        #     return Response(
        #         {"message": "Unauthorized Access"}, status=status.HTTP_401_UNAUTHORIZED
        #     )

        result = self.get_object(pk)

        # print(isinstance(result, Response))

        # print(request.data)
        # return Response({"ok": "ok"})

        # Checking whether the result is the instance of the Response
        if isinstance(result, Response):
            return result

        serializer = ListSerializer(result, data=request.data, partial=True)

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):

        result = self.get_object(pk)

        # Checking whether the result is the instance of the Response
        if isinstance(result, Response):
            return result

        result.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


class UserRegisterAPI(APIView):

    def post(self, request):

        serializer = UserRegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginAPI(APIView):

    def post(self, request):

        try:
            user = User.objects.get(email=request.data.get("email"))

            if user.password == request.data.get("password"):
                serializer = UserLoginSerializer(user)
                return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(
                {"message": "User with this email does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )

        except Exception as e:
            return Response(
                {"message": f"An unexpected error occurred: {e}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            {"message": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )
