/**
 * Service API pour l'application Flutter
 * Gère toutes les requêtes HTTP vers le backend Spring Boot
 */

import 'package:dio/dio.dart';
import 'package:retrofit/retrofit.dart';
import 'package:json_annotation/json_annotation.dart';
import '../models/delivery.dart';
import '../models/user.dart';

part 'api_service.g.dart';

// Modèles de requête
@JsonSerializable()
class LoginRequest {
  final String email;
  final String password;

  const LoginRequest({
    required this.email,
    required this.password,
  });

  factory LoginRequest.fromJson(Map<String, dynamic> json) => _$LoginRequestFromJson(json);
  Map<String, dynamic> toJson() => _$LoginRequestToJson(this);
}

@JsonSerializable()
class LoginResponse {
  final String accessToken;
  final String refreshToken;
  final User user;

  const LoginResponse({
    required this.accessToken,
    required this.refreshToken,
    required this.user,
  });

  factory LoginResponse.fromJson(Map<String, dynamic> json) => _$LoginResponseFromJson(json);
  Map<String, dynamic> toJson() => _$LoginResponseToJson(this);
}

@JsonSerializable()
class CreateDeliveryRequest {
  final String customerName;
  final String customerPhone;
  final String pickupAddress;
  final String deliveryAddress;
  final String pickupCity;
  final String deliveryCity;
  final double weight;
  final double price;
  final String? notes;

  const CreateDeliveryRequest({
    required this.customerName,
    required this.customerPhone,
    required this.pickupAddress,
    required this.deliveryAddress,
    required this.pickupCity,
    required this.deliveryCity,
    required this.weight,
    required this.price,
    this.notes,
  });

  factory CreateDeliveryRequest.fromJson(Map<String, dynamic> json) => _$CreateDeliveryRequestFromJson(json);
  Map<String, dynamic> toJson() => _$CreateDeliveryRequestToJson(this);
}

@JsonSerializable()
class UpdateDeliveryStatusRequest {
  final DeliveryStatus status;
  final String? notes;

  const UpdateDeliveryStatusRequest({
    required this.status,
    this.notes,
  });

  factory UpdateDeliveryStatusRequest.fromJson(Map<String, dynamic> json) => _$UpdateDeliveryStatusRequestFromJson(json);
  Map<String, dynamic> toJson() => _$UpdateDeliveryStatusRequestToJson(this);
}

// Interface du service API
@RestApi(baseUrl: "http://localhost:8081/api/v1")
abstract class ApiService {
  factory ApiService(Dio dio, {String baseUrl}) = _ApiService;

  // ===== AUTHENTIFICATION =====

  @POST("/auth/login")
  Future<LoginResponse> login(@Body() LoginRequest request);

  @POST("/auth/logout")
  Future<void> logout();

  @POST("/auth/refresh")
  Future<LoginResponse> refreshToken(@Body() Map<String, String> request);

  @GET("/auth/profile")
  Future<User> getProfile();

  // ===== LIVRAISONS =====

  @POST("/deliveries")
  Future<Delivery> createDelivery(@Body() CreateDeliveryRequest request);

  @GET("/deliveries")
  Future<List<Delivery>> getDeliveries({
    @Query("status") String? status,
    @Query("driverId") String? driverId,
    @Query("dateFrom") String? dateFrom,
    @Query("dateTo") String? dateTo,
    @Query("city") String? city,
  });

  @GET("/deliveries/{trackingNumber}")
  Future<Delivery> getDeliveryByTrackingNumber(@Path("trackingNumber") String trackingNumber);

  @GET("/deliveries/status/{status}")
  Future<List<Delivery>> getDeliveriesByStatus(@Path("status") String status);

  @GET("/deliveries/driver/{driverId}")
  Future<List<Delivery>> getDeliveriesByDriver(@Path("driverId") String driverId);

  @PUT("/deliveries/{trackingNumber}/status")
  Future<Delivery> updateDeliveryStatus(
    @Path("trackingNumber") String trackingNumber,
    @Body() UpdateDeliveryStatusRequest request,
  );

  @PUT("/deliveries/{trackingNumber}/assign")
  Future<Delivery> assignDeliveryToDriver(
    @Path("trackingNumber") String trackingNumber,
    @Query("driverId") String driverId,
    @Query("vehicleId") String vehicleId,
  );

  @GET("/deliveries/tracking/{trackingNumber}")
  Future<Delivery> trackDelivery(@Path("trackingNumber") String trackingNumber);

  // ===== CHAUFFEURS =====

  @GET("/drivers")
  Future<List<dynamic>> getDrivers({
    @Query("status") String? status,
    @Query("city") String? city,
    @Query("available") bool? available,
  });

  @GET("/drivers/{driverId}")
  Future<dynamic> getDriver(@Path("driverId") String driverId);

  @GET("/drivers/available")
  Future<List<dynamic>> getAvailableDrivers();

  @PUT("/drivers/{driverId}/status")
  Future<dynamic> updateDriverStatus(
    @Path("driverId") String driverId,
    @Body() Map<String, String> request,
  );

  @PUT("/drivers/{driverId}/location")
  Future<dynamic> updateDriverLocation(
    @Path("driverId") String driverId,
    @Body() Map<String, double> request,
  );

  // ===== VÉHICULES =====

  @GET("/vehicles")
  Future<List<dynamic>> getVehicles();

  @GET("/vehicles/{vehicleId}")
  Future<dynamic> getVehicle(@Path("vehicleId") String vehicleId);

  @GET("/vehicles/available")
  Future<List<dynamic>> getAvailableVehicles();

  @PUT("/vehicles/{vehicleId}/status")
  Future<dynamic> updateVehicleStatus(
    @Path("vehicleId") String vehicleId,
    @Body() Map<String, String> request,
  );

  // ===== STATISTIQUES =====

  @GET("/stats/deliveries")
  Future<Map<String, dynamic>> getDeliveryStats();

  @GET("/stats/drivers")
  Future<Map<String, dynamic>> getDriverStats();

  // ===== UTILITAIRES =====

  @GET("/actuator/health")
  Future<Map<String, dynamic>> healthCheck();
}

// Configuration Dio
class ApiServiceConfig {
  static Dio createDio() {
    final dio = Dio();
    
    // Configuration de base
    dio.options.connectTimeout = const Duration(seconds: 10);
    dio.options.receiveTimeout = const Duration(seconds: 10);
    dio.options.sendTimeout = const Duration(seconds: 10);
    
    // Intercepteur pour ajouter le token d'authentification
    dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          // Ajouter le token d'authentification si disponible
          // final token = await getStoredToken();
          // if (token != null) {
          //   options.headers['Authorization'] = 'Bearer $token';
          // }
          handler.next(options);
        },
        onError: (error, handler) async {
          if (error.response?.statusCode == 401) {
            // Token expiré, essayer de le rafraîchir
            // await refreshToken();
            // Retry la requête
            // return handler.resolve(await dio.fetch(error.requestOptions));
          }
          handler.next(error);
        },
      ),
    );
    
    return dio;
  }
} 