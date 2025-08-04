/**
 * Application principale Flutter
 * Point d'entrée de l'application avec configuration et routage
 */

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:permission_handler/permission_handler.dart';

import 'screens/auth/login_screen.dart';
import 'screens/dashboard/dashboard_screen.dart';
import 'screens/delivery/delivery_list_screen.dart';
import 'screens/delivery/delivery_detail_screen.dart';
import 'screens/tracking/tracking_screen.dart';
import 'screens/profile/profile_screen.dart';
import 'providers/auth_provider.dart';
import 'providers/delivery_provider.dart';
import 'utils/constants.dart';
import 'utils/theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialiser Hive pour le stockage local
  await Hive.initFlutter();
  
  // Initialiser SharedPreferences
  await SharedPreferences.getInstance();
  
  // Demander les permissions nécessaires
  await _requestPermissions();
  
  runApp(const ProviderScope(child: DeliveryApp()));
}

Future<void> _requestPermissions() async {
  // Permissions de localisation
  await Permission.location.request();
  
  // Permissions de notification
  await Permission.notification.request();
  
  // Permissions de caméra (pour scanner QR code)
  await Permission.camera.request();
}

class DeliveryApp extends ConsumerWidget {
  const DeliveryApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);
    
    return MaterialApp.router(
      title: 'Mobility - Livraison',
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system,
      routerConfig: _createRouter(authState),
      debugShowCheckedModeBanner: false,
    );
  }

  GoRouter _createRouter(AuthState authState) {
    return GoRouter(
      initialLocation: '/',
      redirect: (context, state) {
        final isLoggedIn = authState.isAuthenticated;
        final isLoggingIn = state.matchedLocation == '/login';
        
        // Si l'utilisateur n'est pas connecté et n'est pas sur la page de connexion
        if (!isLoggedIn && !isLoggingIn) {
          return '/login';
        }
        
        // Si l'utilisateur est connecté et est sur la page de connexion
        if (isLoggedIn && isLoggingIn) {
          return '/dashboard';
        }
        
        return null;
      },
      routes: [
        // Route de connexion
        GoRoute(
          path: '/login',
          name: 'login',
          builder: (context, state) => const LoginScreen(),
        ),
        
        // Route publique de suivi
        GoRoute(
          path: '/tracking',
          name: 'tracking',
          builder: (context, state) => const TrackingScreen(),
        ),
        
        // Routes protégées
        ShellRoute(
          builder: (context, state, child) => MainLayout(child: child),
          routes: [
            // Tableau de bord
            GoRoute(
              path: '/dashboard',
              name: 'dashboard',
              builder: (context, state) => const DashboardScreen(),
            ),
            
            // Livraisons
            GoRoute(
              path: '/deliveries',
              name: 'deliveries',
              builder: (context, state) => const DeliveryListScreen(),
            ),
            
            // Détail d'une livraison
            GoRoute(
              path: '/deliveries/:trackingNumber',
              name: 'delivery-detail',
              builder: (context, state) {
                final trackingNumber = state.pathParameters['trackingNumber']!;
                return DeliveryDetailScreen(trackingNumber: trackingNumber);
              },
            ),
            
            // Profil utilisateur
            GoRoute(
              path: '/profile',
              name: 'profile',
              builder: (context, state) => const ProfileScreen(),
            ),
          ],
        ),
      ],
    );
  }
}

/// Layout principal avec navigation
class MainLayout extends ConsumerWidget {
  final Widget child;
  
  const MainLayout({super.key, required this.child});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);
    
    return Scaffold(
      body: child,
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: _getCurrentIndex(context),
        onTap: (index) => _onTabTapped(context, index),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.dashboard),
            label: 'Tableau de bord',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.local_shipping),
            label: 'Livraisons',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.qr_code_scanner),
            label: 'Scanner',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profil',
          ),
        ],
      ),
    );
  }

  int _getCurrentIndex(BuildContext context) {
    final location = GoRouterState.of(context).matchedLocation;
    
    if (location.startsWith('/dashboard')) return 0;
    if (location.startsWith('/deliveries')) return 1;
    if (location.startsWith('/scanner')) return 2;
    if (location.startsWith('/profile')) return 3;
    
    return 0;
  }

  void _onTabTapped(BuildContext context, int index) {
    switch (index) {
      case 0:
        context.go('/dashboard');
        break;
      case 1:
        context.go('/deliveries');
        break;
      case 2:
        // Ouvrir le scanner QR
        _showQRScanner(context);
        break;
      case 3:
        context.go('/profile');
        break;
    }
  }

  void _showQRScanner(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        height: MediaQuery.of(context).size.height * 0.8,
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
        ),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              decoration: const BoxDecoration(
                border: Border(bottom: BorderSide(color: Colors.grey, width: 0.5)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Scanner QR Code',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  IconButton(
                    onPressed: () => Navigator.pop(context),
                    icon: const Icon(Icons.close),
                  ),
                ],
              ),
            ),
            Expanded(
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      Icons.qr_code_scanner,
                      size: 100,
                      color: Colors.grey[400],
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Scanner QR Code',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.grey[600],
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Fonctionnalité en cours de développement',
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.grey[500],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
} 