<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php')) {
    require SYSTEMPATH . 'Config/Routes.php';
}

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
//$routes->get('/', 'Home::index');
$routes->get('/', 'AuditCrud::index');
$routes->get('', 'AuditCrud::index');
$routes->get('/html-to-pdf','PDF::index');
$routes->post('audit/send/pdf/(:alphanum)','AuditCrud::salesforceResultPDF/$1');
$routes->get('audit/send/pdf/(:alphanum)','AuditCrud::salesforceResultPDF/$1');
/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}

//accounts
$routes->get('accounts', 'AccountCrud::index');
$routes->get('account/new', 'AccountCrud::create');
$routes->post('account/new', 'AccountCrud::store');
$routes->get('account/(:num)', 'AccountCrud::singleAccount/$1');
$routes->post('update-account', 'AccountCrud::update');
$routes->get('account/(:num)/delete', 'AccountCrud::delete/$1');
$routes->post('account/charge-settings', 'AccountCrud::chargeSettings');
$routes->post('account/upload', 'AccountCrud::upload');
$routes->get('account/upload', 'AccountCrud::uploadAccount');

//audits
$routes->get('audits', 'AuditCrud::index');
$routes->get('audit/new', 'AuditCrud::create');
$routes->post('submit-audit-form', 'AuditCrud::store');
$routes->get('audit/reviewed', 'AuditCrud::new_reviews');
$routes->get('audit/expiring', 'AuditCrud::expiring');
$routes->get('audit/unpaid', 'AuditCrud::unpaid');
$routes->get('audit/(:alphanum)', 'AuditCrud::singleAudit/$1');
$routes->get('audit/(:alphanum)/edit', 'AuditCrud::editSingleAudit/$1'); 
$routes->post('update-audit', 'AuditCrud::edit');
$routes->get('audit/(:alphanum)/delete', 'AuditCrud::delete/$1');
$routes->post('audit/(:alphanum)/pay', 'AuditCrud::markPaid/$1');

$routes->get('audit/(:alphanum)/resubmit', 'AuditCrud::resubmit/$1');

$routes->get('audit/(:alphanum)/account', 'AuditCrud::register/$1');
$routes->post('audit/(:alphanum)/account', 'SignupController::store/$1');

$routes->get('stripe', 'StripeController::index');
$routes->get('stripe/create-charge', 'StripeController::createCharge');
$routes->post('stripe/create-charge', 'StripeController::createCharge');
$routes->post('payment-success/(:alphanum)', 'StripeController::paymentSuccess/$1');
$routes->get('payment-success/(:alphanum)', 'StripeController::paymentSuccess/$1');

$routes->get('audit/(:alphanum)/chase', 'AuditCrud::chaseEmail/$1');

$routes->post('save-responses', 'AuditCrud::save');
$routes->get('audit/responses/(:alphanum)', 'AuditCrud::getResponses/$1');

$routes->post('update-answer', 'AuditCrud::updateAnswer');
$routes->post('score-audit', 'AuditCrud::hotelCheckStore');
$routes->get('audit/(:alphanum)/review', 'AuditCrud::hotelCheckAudit/$1');

$routes->get('refresh-stats/(:num)', 'AuditCrud::chaseList/$1');
$routes->get('chases/(:num)/', 'AuditCrud::chaseList/$1');
$routes->get('chases/(:num)/(:alphanum)', 'AuditCrud::chaseList/$1/$2');

//files
$routes->post('remove-file/(:segment)', 'UploadController::deleteFile/$1');
$routes->get('generate-csv', 'AuditCrud::writeFile');

//groups
$routes->get('groups', 'GroupCrud::index');
$routes->get('group/new', 'GroupCrud::create');
$routes->post('group/new', 'GroupCrud::store');
$routes->get('group/(:num)', 'GroupCrud::singleGroup/$1');
$routes->post('update-group', 'GroupCrud::update');
$routes->get('group/(:num)/delete', 'GroupCrud::delete/$1');

//comments
$routes->post('comment-save', 'ContactController::store');
$routes->post('comment-save-admin', 'ContactController::storeAdmin');
$routes->post('comment-delete', 'ContactController::delete');

//questions
$routes->get('questions', 'QuestionController::index');
$routes->get('question/(:num)', 'QuestionController::singleQuestion/$1');
$routes->post('update-question', 'QuestionController::update');

//emails
$routes->get('email/(:segment)/(:alpha)', 'EmailController::getEmailHtml/$1/$2');
$routes->post('email/(:segment)/(:alpha)', 'EmailController::getEmailHtml/$1/$2');
// custom routes
//$routes->get('/', 'SignupController::index');
$routes->get('/signup', 'SignupController::index');
$routes->get('/signin', 'SigninController::index');
$routes->get('/profile', 'ProfileController::index',['filter' => 'authguard']);
$routes->get('/signout', 'SigninController::signout');
$routes->get('/users', 'ProfileController::index');
$routes->get('/user/(:num)/delete', 'ProfileController::delete/$1');
$routes->get('user/(:num)', 'ProfileController::singleUser/$1');
$routes->post('user/update', 'ProfileController::update');

$routes->get('/register','SignupController::selfserve');
$routes->post('/register','SignupController::store_selfserve');

$routes->get('/request-reset','SignupController::reset_request');
$routes->get('/password-reset/(:alphanum)/(:alphanum)','SignupController::reset_password/$1/$2');

$routes->get('/privacy-policy', 'AuditCrud::privacyPolicy');
$routes->get('/privacy-policy/(:segment)', 'AuditCrud::privacyPolicy/$1');

