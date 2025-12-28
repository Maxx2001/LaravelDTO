---
title: "Events Domain"
description: "Documentatie voor het Events domein - Eventbeheer, uitnodigingen en kalenderintegraties"
---

## Concept

Het Events domein beheert alle functionaliteit rondom evenementen in Partydos. Dit domein maakt het mogelijk om:

- **Evenementen aan te maken** door zowel geauthenticeerde gebruikers als gasten
- **Evenementen te beheren** met volledige CRUD-operaties (Create, Read, Update, Delete)
- **Uitnodigingen te versturen en te accepteren** voor gebruikers en gastgebruikers
- **Evenementen te delen** via unieke share links
- **Kalenderintegraties** te gebruiken (Google Calendar, ICS-bestanden)
- **Evenementen te annuleren en te herstellen** zonder ze permanent te verwijderen
- **Media bij te voegen** aan evenementen (banners/afbeeldingen)

Het domein ondersteunt zowel geauthenticeerde gebruikers (`User`) als gastgebruikers (`GuestUser`) als event owners en deelnemers. Evenementen kunnen een locatie (adres) hebben en ondersteunen verschillende statussen voor uitnodigingen.

## Data Structuur (DTO's)

### EventEntity

De hoofd-DTO die wordt gebruikt voor het weergeven van evenementen. Deze bevat alle relevante informatie over een evenement inclusief metadata, relaties en rechten.

<ParamField path="id" type="int" required>
  Unieke identifier van het evenement
</ParamField>

<ParamField path="uniqueIdentifier" type="string" required>
  Unieke identifier voor share links (bijv. voor `/event-invite/{uniqueIdentifier}`)
</ParamField>

<ParamField path="title" type="string" required>
  Titel van het evenement
</ParamField>

<ParamField path="description" type="string">
  Beschrijving van het evenement (optioneel)
</ParamField>

<ParamField path="startDateTime" type="string" required>
  Startdatum en -tijd van het evenement (formaat: Y-m-d H:i:s)
</ParamField>

<ParamField path="isoStartDateTime" type="string">
  ISO-formaat startdatum en -tijd (Y-m-d\TH:i:s)
</ParamField>

<ParamField path="endDateTime" type="string">
  Einddatum en -tijd van het evenement (optioneel)
</ParamField>

<ParamField path="isoEndDateTime" type="string">
  ISO-formaat einddatum en -tijd (optioneel)
</ParamField>

<ParamField path="formattedDate" type="string">
  Geformatteerde datum (bijv. "Mon 15 January")
</ParamField>

<ParamField path="formattedTime" type="string">
  Geformatteerde tijd (bijv. "14:00 - 16:00")
</ParamField>

<ParamField path="canceledAt" type="string">
  Timestamp wanneer het evenement is geannuleerd (null indien niet geannuleerd)
</ParamField>

<ParamField path="status" type="string">
  Status van de uitnodiging voor de huidige gebruiker (pending, maybe, accepted, declined)
</ParamField>

<ParamField path="shareLink" type="string" required>
  Volledige URL voor het delen van het evenement
</ParamField>

<ParamField path="googleCalendarLink" type="string">
  Google Calendar link om het evenement toe te voegen aan Google Calendar
</ParamField>

<ParamField path="media" type="DataCollection&lt;PictureDataEntity&gt;">
  Collectie van media items (bijv. event banner afbeeldingen)
</ParamField>

<ParamField path="address" type="AddressEntity">
  Adres/locatie van het evenement (optioneel)
</ParamField>

<ParamField path="eventOwner" type="UserProfileEntity" required>
  De eigenaar van het evenement (kan een User of GuestUser zijn)
</ParamField>

<ParamField path="invitedUsers" type="DataCollection&lt;UserProfileEntity&gt;">
  Collectie van uitgenodigde gebruikers en gastgebruikers
</ParamField>

<ParamField path="createdAt" type="Carbon" required>
  Timestamp wanneer het evenement is aangemaakt
</ParamField>

<ParamField path="updatedAt" type="Carbon" required>
  Timestamp van laatste wijziging
</ParamField>

<ParamField path="canEdit" type="bool">
  Of de huidige gebruiker het evenement kan bewerken (alleen voor eigenaar)
</ParamField>

### AuthenticatedEventData

DTO voor het aanmaken van een evenement door een geauthenticeerde gebruiker.

<ParamField path="title" type="string" required>
  Titel van het evenement (max 255 karakters)
</ParamField>

<ParamField path="description" type="string">
  Beschrijving van het evenement (optioneel)
</ParamField>

<ParamField path="location" type="AddressCreateData">
  Locatie/adres van het evenement (optioneel)
</ParamField>

<ParamField path="start_date_time" type="string" required>
  Startdatum en -tijd (date format)
</ParamField>

<ParamField path="end_date_time" type="string">
  Einddatum en -tijd (date format, optioneel)
</ParamField>

<ParamField path="image" type="UploadedFile">
  Afbeelding voor het evenement banner (jpg, png, jpeg, gif, max 5MB)
</ParamField>

### AuthenticatedEventUpdateData

DTO voor het bijwerken van een evenement door een geauthenticeerde gebruiker.

<ParamField path="title" type="string">
  Titel van het evenement (optioneel bij update)
</ParamField>

<ParamField path="description" type="string">
  Beschrijving van het evenement (optioneel)
</ParamField>

<ParamField path="location" type="AddressUpdateData">
  Locatie/adres van het evenement (optioneel)
</ParamField>

<ParamField path="start_date_time" type="string">
  Startdatum en -tijd (optioneel bij update)
</ParamField>

<ParamField path="end_date_time" type="string">
  Einddatum en -tijd (optioneel)
</ParamField>

<ParamField path="image" type="UploadedFile">
  Nieuwe afbeelding voor het evenement banner (optioneel)
</ParamField>

<ParamField path="remove_image" type="bool">
  Of de huidige afbeelding moet worden verwijderd (default: false)
</ParamField>

### GuestEventCreateData

DTO voor het aanmaken van een evenement door een gastgebruiker.

<ParamField path="name" type="string" required>
  Naam van de gastgebruiker
</ParamField>

<ParamField path="email" type="string" required>
  E-mailadres van de gastgebruiker (moet uniek zijn, niet in gebruikers tabel)
</ParamField>

<ParamField path="title" type="string" required>
  Titel van het evenement (max 255 karakters)
</ParamField>

<ParamField path="description" type="string">
  Beschrijving van het evenement (optioneel)
</ParamField>

<ParamField path="location" type="AddressCreateData">
  Locatie/adres van het evenement (optioneel)
</ParamField>

<ParamField path="start_date_time" type="string" required>
  Startdatum en -tijd (date format)
</ParamField>

<ParamField path="end_date_time" type="string">
  Einddatum en -tijd (date format, optioneel)
</ParamField>

<ParamField path="image" type="UploadedFile">
  Afbeelding voor het evenement banner (jpg, png, jpeg, gif, max 5MB)
</ParamField>

### EventData

Eenvoudigere DTO voor evenement data (gebruikt in sommige contexten).

<ParamField path="id" type="int" required>
  Unieke identifier
</ParamField>

<ParamField path="uniqueIdentifier" type="string" required>
  Unieke identifier voor share links
</ParamField>

<ParamField path="title" type="string" required>
  Titel van het evenement
</ParamField>

<ParamField path="description" type="string">
  Beschrijving
</ParamField>

<ParamField path="startDateTime" type="string" required>
  Startdatum en -tijd
</ParamField>

<ParamField path="endDateTime" type="string">
  Einddatum en -tijd
</ParamField>

<ParamField path="canceledAt" type="string">
  Annuleringsdatum
</ParamField>

<ParamField path="status" type="string">
  Status van uitnodiging
</ParamField>

<ParamField path="shareLink" type="string" required>
  Share link URL
</ParamField>

<ParamField path="eventOwner" type="User|GuestUser" required>
  Eigenaar van het evenement
</ParamField>

<ParamField path="participants" type="array&lt;User|GuestUser&gt;">
  Array van deelnemers
</ParamField>

<ParamField path="createdAt" type="Carbon" required>
  Aanmaakdatum
</ParamField>

<ParamField path="updatedAt" type="Carbon" required>
  Laatste wijziging
</ParamField>

### EventInviteViewData

DTO voor het bepalen welke UI-elementen moeten worden getoond op een event invite pagina.

<ParamField path="showInviteButton" type="bool">
  Of de "Accepteer uitnodiging" knop moet worden getoond
</ParamField>

<ParamField path="showCancelButton" type="bool">
  Of de "Annuleer deelname" knop moet worden getoond
</ParamField>

### ParticipantData

DTO voor deelnemer informatie.

<ParamField path="id" type="int" required>
  Unieke identifier van de deelnemer
</ParamField>

<ParamField path="name" type="string" required>
  Naam van de deelnemer
</ParamField>

<ParamField path="email" type="string" required>
  E-mailadres van de deelnemer
</ParamField>

### EventStatus Enum

Enum voor de status van een uitnodiging.

- `PENDING` - Uitnodiging is verstuurd, nog geen reactie
- `MAYBE` - Gebruiker twijfelt
- `ACCEPTED` - Uitnodiging geaccepteerd
- `DECLINED` - Uitnodiging geweigerd

## Belangrijkste Acties

### AuthenticatedEventCreateAction

Maakt een nieuw evenement aan voor een geauthenticeerde gebruiker.

**Functionaliteit:**
- Creëert een evenement gekoppeld aan de ingelogde gebruiker
- Voegt optioneel een adres/locatie toe
- Voegt optioneel een banner afbeelding toe
- Past automatisch de einddatum aan indien niet opgegeven
- Genereert een unieke identifier voor share links
- Toont een notificatie bij succes

**Gebruik:**
```php
$action = new AuthenticatedEventCreateAction();
$event = $action->execute($authenticatedEventData);
```

### AuthenticatedEventUpdateAction

Werkt een bestaand evenement bij voor een geauthenticeerde gebruiker.

**Functionaliteit:**
- Werkt evenement eigenschappen bij
- Kan adres toevoegen, bijwerken of verwijderen
- Kan banner afbeelding vervangen of verwijderen
- Past automatisch de einddatum aan indien nodig
- Toont een notificatie bij succes

**Gebruik:**
```php
$action = new AuthenticatedEventUpdateAction();
$event = $action->execute($event, $authenticatedEventUpdateData);
```

### GuestEventCreateAction

Maakt een nieuw evenement aan voor een gastgebruiker.

**Functionaliteit:**
- Creëert of vindt een gastgebruiker op basis van e-mail en naam
- Creëert een evenement gekoppeld aan de gastgebruiker
- Voegt optioneel een adres/locatie toe
- Voegt optioneel een banner afbeelding toe
- Past automatisch de einddatum aan indien niet opgegeven

**Gebruik:**
```php
$action = new GuestEventCreateAction(
    $createAddressAction,
    $createOrFindGuestUserAction,
    $attachMediaToModelAction,
    $dateAdjustmentService
);
$event = $action->execute($guestEventCreateData);
```

### ViewEventsAction

Haalt alle toekomstige evenementen op voor de ingelogde gebruiker.

**Functionaliteit:**
- Haalt alle evenementen op waar de gebruiker aan deelneemt
- Filtert alleen toekomstige evenementen (startdatum >= nu)
- Retourneert een collectie van EventEntity DTO's

**Gebruik:**
```php
$action = new ViewEventsAction();
$events = $action->execute();
```

### GetEventListsForUserAction

Haalt verschillende lijsten van evenementen op voor een gebruiker.

**Functionaliteit:**
- Haalt uitgenodigde evenementen op (toekomstig)
- Haalt eigen evenementen op (toekomstig, gesorteerd op startdatum)
- Haalt historische evenementen op (verleden)
- Retourneert een collectie met drie categorieën

**Gebruik:**
```php
$action = new GetEventListsForUserAction();
$eventLists = $action->execute($user);
// Retourneert: ['invitedEvents', 'ownedEvents', 'historyEvents']
```

### AcceptEventInviteAction

Accepteert een uitnodiging voor een evenement.

**Functionaliteit:**
- Voegt een gebruiker toe aan de deelnemers van een evenement
- Controleert of de gebruiker al is toegevoegd
- Controleert of het e-mailadres al in gebruik is door een gastgebruiker
- Toont notificaties bij verschillende scenario's

**Gebruik:**
```php
$action = new AcceptEventInviteAction();
$action->execute($event, $user);
```

### CancelEventAction

Annuleert een evenement.

**Functionaliteit:**
- Stelt de `canceled_at` timestamp in op de huidige tijd
- Het evenement blijft bestaan maar wordt gemarkeerd als geannuleerd
- Toont een notificatie bij succes

**Gebruik:**
```php
$action = new CancelEventAction();
$action->execute($event);
```

### RestoreEventAction

Herstelt een geannuleerd evenement.

**Functionaliteit:**
- Verwijdert de `canceled_at` timestamp (zet op null)
- Het evenement is weer actief
- Toont een notificatie bij succes

**Gebruik:**
```php
$action = new RestoreEventAction();
$action->execute($event);
```

### DestroyEventAction

Verwijdert permanent een evenement.

**Functionaliteit:**
- Controleert of de gebruiker de eigenaar is
- Controleert of het evenement eerst is geannuleerd
- Verwijdert het evenement permanent uit de database
- Toont notificaties bij verschillende scenario's

**Gebruik:**
```php
$action = new DestroyEventAction($checkUserIsEventOwnerAction);
$action->execute($event);
```

### EventGenerateIcsAction

Genereert een ICS (iCalendar) bestand voor een evenement.

**Functionaliteit:**
- Genereert een ICS-formaat string
- Bevat alle relevante informatie (titel, beschrijving, locatie, datums)
- Kan worden gedownload en toegevoegd aan kalenderapplicaties

**Gebruik:**
```php
$action = new EventGenerateIcsAction();
$icsContent = $action->execute($event);
```

### CheckUserIsEventOwnerAction

Controleert of een gebruiker de eigenaar is van een evenement.

**Functionaliteit:**
- Verifieert of de gebruiker de eigenaar is
- Gooit een exceptie indien niet de eigenaar

**Gebruik:**
```php
$action = new CheckUserIsEventOwnerAction();
$action->execute($event, $user);
```

## Services

### EventShareLinkService

Genereert share links voor evenementen.

**Functionaliteit:**
- Genereert een unieke URL voor het delen van een evenement
- Format: `{app.url}/event-invite/{unique_identifier}`

**Gebruik:**
```php
$service = new EventShareLinkService();
$shareLink = $service->generateShareLink($event);
```

### GoogleCalendarLinkService

Genereert Google Calendar links voor evenementen.

**Functionaliteit:**
- Genereert een Google Calendar URL met alle event details
- Gebruikers kunnen direct het evenement toevoegen aan hun Google Calendar
- Formatteert datums correct voor Google Calendar API

**Gebruik:**
```php
$link = GoogleCalendarLinkService::generateLink(
    $startDateTime,
    $endDateTime,
    $title,
    $description,
    $location
);
```

## Gebruik

### Voorbeeld: Evenement aanmaken vanuit een Controller

```php
<?php

namespace App\Web\Events\Controllers;

use Domain\Events\Actions\AuthenticatedEventCreateAction;
use Domain\Events\DataTransferObjects\AuthenticatedEventData;
use Domain\Events\DataTransferObjects\EventEntity;
use Illuminate\Http\RedirectResponse;
use Support\Controllers\Controller;

class EventController extends Controller
{
    public function store(
        AuthenticatedEventCreateAction $authenticatedEventCreateAction,
        AuthenticatedEventData $authenticatedEventStoreData
    ): RedirectResponse {
        // De DTO wordt automatisch gevalideerd door Laravel
        // De Action wordt automatisch geïnjecteerd door dependency injection
        
        $event = $authenticatedEventCreateAction->execute($authenticatedEventStoreData);
        
        // Redirect naar de event invite pagina
        return redirect()->route('events.show-invite', $event);
    }
}
```

### Voorbeeld: Evenement bijwerken

```php
public function update(
    Event $event,
    AuthenticatedEventUpdateAction $authenticatedEventUpdateAction,
    AuthenticatedEventUpdateData $authenticatedEventUpdateData,
    CheckUserIsEventOwnerAction $checkOwnerAction
): RedirectResponse {
    /** @var \Domain\Users\Models\User $user */
    $user = Auth::user();
    
    // Controleer of gebruiker eigenaar is
    $checkOwnerAction->execute($event, $user);
    
    // Werk het evenement bij
    $event = $authenticatedEventUpdateAction->execute($event, $authenticatedEventUpdateData);
    
    return redirect()->route('events.show-invite', $event);
}
```

### Voorbeeld: Evenementen ophalen

```php
public function index(GetEventListsForUserAction $getEventListsForUserAction): Response
{
    /** @var \Domain\Users\Models\User $user */
    $user = auth()->user();
    
    $eventLists = $getEventListsForUserAction->execute($user);
    
    return Inertia::render('Events/Index', [
        'events' => EventEntity::collect($eventLists->get('invitedEvents') ?? collect()),
        'ownedEvents' => EventEntity::collect($eventLists->get('ownedEvents') ?? collect()),
        'historyEvents' => EventEntity::collect($eventLists->get('historyEvents') ?? collect()),
    ]);
}
```

### Voorbeeld: Uitnodiging accepteren

```php
public function acceptInvite(
    Event $event,
    AcceptEventInviteAction $acceptInvite
): RedirectResponse {
    /** @var \Domain\Users\Models\User $user */
    $user = Auth::user();
    
    $acceptInvite->execute($event, $user);
    
    return redirect()->back();
}
```

### Voorbeeld: ICS-bestand downloaden

```php
public function downloadEventICS(
    Event $event,
    EventGenerateIcsAction $eventGenerateIcsAction
): Response {
    $ics = $eventGenerateIcsAction->execute($event);
    
    return response($ics)
        ->header('Content-Type', 'text/calendar')
        ->header('Content-Disposition', 'attachment; filename="event.ics"');
}
```

## Model Relaties

Het `Event` model heeft de volgende relaties:

- **user()** - BelongsTo: De geauthenticeerde gebruiker die eigenaar is
- **guestUser()** - BelongsTo: De gastgebruiker die eigenaar is
- **users()** - BelongsToMany: Geauthenticeerde gebruikers die zijn uitgenodigd
- **guestUsers()** - BelongsToMany: Gastgebruikers die zijn uitgenodigd
- **address()** - MorphOne: Het adres/locatie van het evenement

## Scopes

Het `Event` model heeft de volgende query scopes:

- **futureEvents()** - Filtert evenementen die in de toekomst plaatsvinden
- **historyEvents()** - Filtert evenementen die in het verleden plaatsvinden

## Accessors

Het `Event` model heeft de volgende accessors:

- **shareLink** - Genereert de share link URL
- **eventOwner** - Retourneert de eigenaar (User of GuestUser)
- **formattedDate** - Geformatteerde datum string
- **formattedTime** - Geformatteerde tijd string
- **isoStartDateTime** - ISO-formaat startdatum
- **isoEndDateTime** - ISO-formaat einddatum
- **googleCalendarLink** - Google Calendar link
- **invitedUsers** - Collectie van alle uitgenodigde gebruikers

