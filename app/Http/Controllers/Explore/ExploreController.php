<?php

namespace App\Http\Controllers\Explore;

use App\Http\Controllers\Controller;
use App\Models\Album;
use App\Models\Collection;
use Gloudemans\Shoppingcart\Facades\Cart;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ExploreController extends Controller
{
    public function index(): Response
    {

        //* limit setting for all 3 partials on explore/index:
        $limit = 6;


        //? ----- SPOTLIGHT: ARTISTS BY STARTING LETTER -----
        // this section cycles through a random letter and if records are found, will display them. If records not found, it rerolls letters until it finds records

        function randomLetter()
        {
          return "B"; // trying to fix page crash
        }

        $letter = randomLetter();

        $spotlightAlbums = Album::where(function ($query) use ($letter) {
            $query->where('artist', 'like',  $letter . '%');
        })
            ->limit($limit)->inRandomOrder()->get();
        $featureLetter = $letter;

        while ($spotlightAlbums->isEmpty()) {

            $letter = randomLetter();

            $spotlightAlbums = Album::where(function ($query) use ($letter) {
                $query->where('artist', 'like',  $letter . '%');
            })
                ->limit($limit)->inRandomOrder()->get();
            $featureLetter = $letter;
        }


        //? ----- NEW RELEASES: ALBUMS THIS WEEK -----

        $recentAlbums = Album::whereBetween('created_at', [Carbon::now()->startOfWeek(Carbon::MONDAY), Carbon::now()->endOfWeek(Carbon::SUNDAY)])->inRandomOrder()->limit($limit)->get();


        //? -----  TOP PICKS: BY SUBGENRE -----
        // dynamically cycles content by subgenre, different every day
        // function process($subgenreList)
        // {
        //     for ($i = 0; $i <= sizeof($subgenreList); $i++) {
        //         $subgenre = $subgenreList[$i];
        //         return $subgenre;
        //     }
        // }
        // $weekday = Carbon::now()->dayOfWeek;


        // // days are 0-6 where sunday is 0, monday is 1, etc
        // switch ($weekday) {
        //     case 0:
        //         $subgenreList = ["Blues", "Rhythm & Blues", "Piano Blues"];
        //         $selectedSubgenre = "Blues";
        //         $subgenre = process($subgenreList);
        //         break;
        //     case 1:
        //         $subgenreList = ["Punk", "Melodic Hardcore", "Hardcore"];
        //         $selectedSubgenre = "Punk";
        //         $subgenre = process($subgenreList);
        //         break;
        //     case 2:
        //         $subgenreList = ["Hardcore Hip-Hop", "Thug Rap", "Pop Rap", "Boom Bap", "Gangsta"];
        //         $selectedSubgenre = "Hip Hop";
        //         $subgenre = process($subgenreList);
        //         break;
        //     case 3:
        //         $subgenreList = ["Classic Rock", "Guitar Rock"];
        //         $subgenre = process($subgenreList);
        //         $selectedSubgenre = "Rock";
        //         break;
        //     case 4:
        //         $subgenreList = ["Punk", "Melodic Hardcore", "Hardcore"];
        //         $selectedSubgenre = "Punk";
        //         $subgenre = process($subgenreList);
        //         break;
        //     case 5:
        //         $subgenreList = ["Hardcore Hip-Hop", "Thug Rap", "Pop Rap", "Boom Bap", "Gangsta"];
        //         $selectedSubgenre = "Hip Hop";
        //         break;
        //     case 6:
        //         $subgenreList = ["Blues", "Rhythm & Blues", "Piano Blues"];
        //         $selectedSubgenre = "Blues";
        //         $subgenre = process($subgenreList);
        //         break;
        //     default:
        //         error_log("Error reading weekday switch in ExploreController.php");
        //         break;
        // }


        // $topPicks = Album::where(function ($query) use ($subgenre) {
        //     $query->where('subgenres', 'like', '%' . $subgenre . '%');
        // })
        //     ->inRandomOrder()
        //     ->limit($limit)
        //     ->get();

        // // error handler for if no results gotten via switch - uses broader "genre" search instead of "subgenre"
        // if ($topPicks->isEmpty()) {
        //     $guaranteed = "Rock";
        //     $selectedSubgenre = $guaranteed;
        //     $topPicks = Album::where(function ($query) use ($guaranteed) {
        //         $query->where('genre', 'like', '%' . $guaranteed . '%');
        //     })
        //         ->inRandomOrder()
        //         ->limit($limit)
        //         ->get();
        // }

        // sending album + ratings to views
        $albumsWithRatings = [];
        $i = 0;
        $allAlbums = Album::all();
        foreach ($allAlbums as $album) {
            $albumsWithRatings['name_and_rating'][$i] = [$album->id, $album->averageRatingAllTypes()];
            $i++;
        }
        $selectedSubgenre = "Rock";
        return Inertia::render(
            'Explore/Index',
            [
                'featureLetter' => $featureLetter,
                'selectedSubgenre' => $selectedSubgenre,                
                'recentAlbums' => $recentAlbums,
                'spotlightAlbums' => $spotlightAlbums,
                'collections' => Collection::with('user')->where('user_id', Auth::user()->id)->get(),
                'cartCount' => Cart::count(),
                'albumsWithRatings' => $albumsWithRatings
            ]
        );
    }

    public function viewAllAlbums(): Response
    {
        $albums = Album::all();

        // sending album + ratings to views
        $albumsWithRatings = [];
        $i = 0;
        $allAlbums = Album::all();
        foreach ($allAlbums as $album) {
            $albumsWithRatings['name_and_rating'][$i] = [$album->id, $album->averageRatingAllTypes()];
            $i++;
        }

        return Inertia::render('Explore/ViewAllAlbums', [
            'totalAlbums' => count($albums),
            'collections' => Collection::with('user')->where('user_id', Auth::user()->id)->get(),
            'albums' => Album::paginate(4),
            'cartCount' => Cart::count(),
            'albumsWithRatings' => $albumsWithRatings,
        ]);
    }
}