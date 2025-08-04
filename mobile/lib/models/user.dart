/**
 * Modèle User pour l'application Flutter
 * Représente un utilisateur avec ses rôles et permissions
 */

import 'package:json_annotation/json_annotation.dart';

part 'user.g.dart';

enum UserRole {
  @JsonValue('CLIENT')
  client,
  @JsonValue('DRIVER')
  driver,
  @JsonValue('ADMIN')
  admin,
  @JsonValue('MANAGER')
  manager,
}

enum UserStatus {
  @JsonValue('ACTIVE')
  active,
  @JsonValue('INACTIVE')
  inactive,
  @JsonValue('SUSPENDED')
  suspended,
}

@JsonSerializable()
class User {
  final String id;
  final String email;
  final String firstName;
  final String lastName;
  final String phone;
  final UserRole role;
  final UserStatus status;
  final DateTime createdAt;
  final DateTime updatedAt;
  final String? avatar;

  const User({
    required this.id,
    required this.email,
    required this.firstName,
    required this.lastName,
    required this.phone,
    required this.role,
    required this.status,
    required this.createdAt,
    required this.updatedAt,
    this.avatar,
  });

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
  Map<String, dynamic> toJson() => _$UserToJson(this);

  User copyWith({
    String? id,
    String? email,
    String? firstName,
    String? lastName,
    String? phone,
    UserRole? role,
    UserStatus? status,
    DateTime? createdAt,
    DateTime? updatedAt,
    String? avatar,
  }) {
    return User(
      id: id ?? this.id,
      email: email ?? this.email,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      phone: phone ?? this.phone,
      role: role ?? this.role,
      status: status ?? this.status,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
      avatar: avatar ?? this.avatar,
    );
  }

  /// Nom complet de l'utilisateur
  String get fullName => '$firstName $lastName';

  /// Initiales de l'utilisateur
  String get initials => '${firstName[0]}${lastName[0]}'.toUpperCase();

  /// Vérifie si l'utilisateur est un client
  bool get isClient => role == UserRole.client;

  /// Vérifie si l'utilisateur est un chauffeur
  bool get isDriver => role == UserRole.driver;

  /// Vérifie si l'utilisateur est un administrateur
  bool get isAdmin => role == UserRole.admin;

  /// Vérifie si l'utilisateur est un manager
  bool get isManager => role == UserRole.manager;

  /// Vérifie si l'utilisateur a des privilèges d'administration
  bool get isAdminOrManager => isAdmin || isManager;

  /// Vérifie si l'utilisateur est actif
  bool get isActive => status == UserStatus.active;

  /// Retourne le rôle en français
  String get roleLabel {
    switch (role) {
      case UserRole.client:
        return 'Client';
      case UserRole.driver:
        return 'Chauffeur';
      case UserRole.admin:
        return 'Administrateur';
      case UserRole.manager:
        return 'Manager';
    }
  }

  /// Retourne le statut en français
  String get statusLabel {
    switch (status) {
      case UserStatus.active:
        return 'Actif';
      case UserStatus.inactive:
        return 'Inactif';
      case UserStatus.suspended:
        return 'Suspendu';
    }
  }

  /// Retourne la couleur du statut
  String get statusColor {
    switch (status) {
      case UserStatus.active:
        return '#10b981'; // Vert
      case UserStatus.inactive:
        return '#6b7280'; // Gris
      case UserStatus.suspended:
        return '#ef4444'; // Rouge
    }
  }

  /// Retourne la couleur du rôle
  String get roleColor {
    switch (role) {
      case UserRole.client:
        return '#3b82f6'; // Bleu
      case UserRole.driver:
        return '#f59e0b'; // Orange
      case UserRole.admin:
        return '#ef4444'; // Rouge
      case UserRole.manager:
        return '#8b5cf6'; // Violet
    }
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is User && other.id == id;
  }

  @override
  int get hashCode => id.hashCode;

  @override
  String toString() {
    return 'User(id: $id, email: $email, role: $role)';
  }
} 