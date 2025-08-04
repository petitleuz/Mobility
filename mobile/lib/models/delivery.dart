/**
 * Modèle Delivery pour l'application Flutter
 * Représente une livraison avec toutes ses propriétés
 */

import 'package:json_annotation/json_annotation.dart';

part 'delivery.g.dart';

enum DeliveryStatus {
  @JsonValue('PENDING')
  pending,
  @JsonValue('ASSIGNED')
  assigned,
  @JsonValue('PICKUP_IN_PROGRESS')
  pickupInProgress,
  @JsonValue('PICKED_UP')
  pickedUp,
  @JsonValue('IN_TRANSIT')
  inTransit,
  @JsonValue('OUT_FOR_DELIVERY')
  outForDelivery,
  @JsonValue('DELIVERED')
  delivered,
  @JsonValue('FAILED')
  failed,
  @JsonValue('CANCELLED')
  cancelled,
}

@JsonSerializable()
class Delivery {
  final int id;
  final String trackingNumber;
  final String customerName;
  final String customerPhone;
  final String pickupAddress;
  final String deliveryAddress;
  final String pickupCity;
  final String deliveryCity;
  final double weight;
  final double price;
  final DeliveryStatus status;
  final String driverId;
  final String vehicleId;
  final DateTime createdAt;
  final DateTime updatedAt;
  final DateTime? pickupTime;
  final DateTime? deliveryTime;
  final String? notes;

  const Delivery({
    required this.id,
    required this.trackingNumber,
    required this.customerName,
    required this.customerPhone,
    required this.pickupAddress,
    required this.deliveryAddress,
    required this.pickupCity,
    required this.deliveryCity,
    required this.weight,
    required this.price,
    required this.status,
    required this.driverId,
    required this.vehicleId,
    required this.createdAt,
    required this.updatedAt,
    this.pickupTime,
    this.deliveryTime,
    this.notes,
  });

  factory Delivery.fromJson(Map<String, dynamic> json) => _$DeliveryFromJson(json);
  Map<String, dynamic> toJson() => _$DeliveryToJson(this);

  Delivery copyWith({
    int? id,
    String? trackingNumber,
    String? customerName,
    String? customerPhone,
    String? pickupAddress,
    String? deliveryAddress,
    String? pickupCity,
    String? deliveryCity,
    double? weight,
    double? price,
    DeliveryStatus? status,
    String? driverId,
    String? vehicleId,
    DateTime? createdAt,
    DateTime? updatedAt,
    DateTime? pickupTime,
    DateTime? deliveryTime,
    String? notes,
  }) {
    return Delivery(
      id: id ?? this.id,
      trackingNumber: trackingNumber ?? this.trackingNumber,
      customerName: customerName ?? this.customerName,
      customerPhone: customerPhone ?? this.customerPhone,
      pickupAddress: pickupAddress ?? this.pickupAddress,
      deliveryAddress: deliveryAddress ?? this.deliveryAddress,
      pickupCity: pickupCity ?? this.pickupCity,
      deliveryCity: deliveryCity ?? this.deliveryCity,
      weight: weight ?? this.weight,
      price: price ?? this.price,
      status: status ?? this.status,
      driverId: driverId ?? this.driverId,
      vehicleId: vehicleId ?? this.vehicleId,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      pickupTime: pickupTime ?? this.pickupTime,
      deliveryTime: deliveryTime ?? this.deliveryTime,
      notes: notes ?? this.notes,
    );
  }

  /// Retourne le statut en français
  String get statusLabel {
    switch (status) {
      case DeliveryStatus.pending:
        return 'En attente';
      case DeliveryStatus.assigned:
        return 'Assigné';
      case DeliveryStatus.pickupInProgress:
        return 'En cours de ramassage';
      case DeliveryStatus.pickedUp:
        return 'Ramassé';
      case DeliveryStatus.inTransit:
        return 'En transit';
      case DeliveryStatus.outForDelivery:
        return 'En livraison';
      case DeliveryStatus.delivered:
        return 'Livré';
      case DeliveryStatus.failed:
        return 'Échec';
      case DeliveryStatus.cancelled:
        return 'Annulé';
    }
  }

  /// Retourne la couleur du statut
  String get statusColor {
    switch (status) {
      case DeliveryStatus.pending:
        return '#f59e0b'; // Orange
      case DeliveryStatus.assigned:
        return '#3b82f6'; // Bleu
      case DeliveryStatus.pickupInProgress:
        return '#8b5cf6'; // Violet
      case DeliveryStatus.pickedUp:
        return '#06b6d4'; // Cyan
      case DeliveryStatus.inTransit:
        return '#3b82f6'; // Bleu
      case DeliveryStatus.outForDelivery:
        return '#f59e0b'; // Orange
      case DeliveryStatus.delivered:
        return '#10b981'; // Vert
      case DeliveryStatus.failed:
        return '#ef4444'; // Rouge
      case DeliveryStatus.cancelled:
        return '#6b7280'; // Gris
    }
  }

  /// Vérifie si la livraison est en cours
  bool get isInProgress {
    return status == DeliveryStatus.pickupInProgress ||
           status == DeliveryStatus.inTransit ||
           status == DeliveryStatus.outForDelivery;
  }

  /// Vérifie si la livraison est terminée
  bool get isCompleted {
    return status == DeliveryStatus.delivered ||
           status == DeliveryStatus.failed ||
           status == DeliveryStatus.cancelled;
  }

  /// Vérifie si la livraison peut être mise à jour
  bool get canUpdate {
    return !isCompleted;
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is Delivery && other.id == id;
  }

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() {
    return 'Delivery(id: $id, trackingNumber: $trackingNumber, status: $status)';
  }
} 