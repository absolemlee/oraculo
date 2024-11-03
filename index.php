<?php
/*Hector Lee Rodriguez aka @absolemlee NOV2024 */
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['question']) && !empty(trim($_POST['question']))) {
    $question = htmlspecialchars($_POST['question'], ENT_QUOTES, 'UTF-8');

    // Initialize SQLite database using PDO
    $dbPath = realpath('resources/iching/data/iching.db');
    $pdo = new PDO('sqlite:' . $dbPath);

    class IChingCasterWithHexagramIdentification
    {
        // Constants for line types
        const CHANGING_YANG = 9;  // Three heads
        const YANG = 7;           // Two heads, one tail
        const YIN = 6;            // Two tails, one head
        const CHANGING_YIN = 8;   // Three tails

        // Hexagram symbols
        private $hexagram_symbols = [
            1 => "䷀", 2 => "䷁", 3 => "䷂", 4 => "䷃", 5 => "䷄", 6 => "䷅", 7 => "䷆", 8 => "䷇",
            9 => "䷈", 10 => "䷉", 11 => "䷊", 12 => "䷋", 13 => "䷌", 14 => "䷍", 15 => "䷎", 16 => "䷏",
            17 => "䷐", 18 => "䷑", 19 => "䷒", 20 => "䷓", 21 => "䷔", 22 => "䷕", 23 => "䷖", 24 => "䷗",
            25 => "䷘", 26 => "䷙", 27 => "䷚", 28 => "䷛", 29 => "䷜", 30 => "䷝", 31 => "䷞", 32 => "䷟",
            33 => "䷠", 34 => "䷡", 35 => "䷢", 36 => "䷣", 37 => "䷤", 38 => "䷥", 39 => "䷦", 40 => "䷧",
            41 => "䷨", 42 => "䷩", 43 => "䷪", 44 => "䷫", 45 => "䷬", 46 => "䷭", 47 => "䷮", 48 => "䷯",
            49 => "䷰", 50 => "䷱", 51 => "䷲", 52 => "䷳", 53 => "䷴", 54 => "䷵", 55 => "䷶", 56 => "䷷",
            57 => "䷸", 58 => "䷺", 59 => "䷺", 60 => "䷻", 61 => "䷼", 62 => "䷽", 63 => "䷾", 64 => "䷿"
        ];

        private $pdo;

        public function __construct($pdo)
        {
            $this->pdo = $pdo;
        }

        // Generate a single line using three-coin probability
        private function generate_line()
        {
            $heads = 0;
            for ($i = 0; $i < 3; $i++) {
                $heads += rand(0, 1);
            }

            // Determine line based on heads count
            if ($heads == 3) {
                return self::CHANGING_YANG;  // Three heads
            } elseif ($heads == 2) {
                return self::YANG;           // Two heads, one tail
            } elseif ($heads == 1) {
                return self::YIN;            // Two tails, one head
            } else {
                return self::CHANGING_YIN;   // Three tails
            }
        }

        // Generate a hexagram from six lines
        public function generate_hexagram()
        {
            $hexagram = [];
            for ($i = 0; $i < 6; $i++) {
                $hexagram[] = $this->generate_line();
            }
            return $hexagram;
        }

        // Convert hexagram lines to a unique identifier for lookup (0 to 63)
        private function hexagram_id_from_lines($hexagram)
        {
            $binary_representation = "";
            foreach ($hexagram as $line) {
                $binary_representation .= ($line == self::YANG || $line == self::CHANGING_YANG) ? '1' : '0';
            }
            return bindec($binary_representation);
        }

        // Get the hexagram number from the generated hexagram (1 to 64)
        public function get_hexagram_number($hexagram)
        {
            return $this->hexagram_id_from_lines($hexagram) + 1;
        }

        // Get the hexagram symbol from the generated hexagram
        public function get_hexagram_symbol($hexagram)
        {
            $hexagram_number = $this->get_hexagram_number($hexagram);
            return $this->hexagram_symbols[$hexagram_number] ?? "Unknown Hexagram";
        }

        // Get the hexagram details from the SQLite database
        public function get_hexagram_details($hexagram)
        {
            $hexagram_number = (string) $this->get_hexagram_number($hexagram);
            $stmt = $this->pdo->prepare("SELECT * FROM iching WHERE hex = :hex_number");
            $stmt->bindParam(':hex_number', $hexagram_number, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }

        // Generate the transformed hexagram if there are changing lines
        public function generate_transformed_hexagram($hexagram)
        {
            $transformed_hexagram = [];
            foreach ($hexagram as $line) {
                if ($line == self::CHANGING_YANG) {
                    $transformed_hexagram[] = self::YIN;
                } elseif ($line == self::CHANGING_YIN) {
                    $transformed_hexagram[] = self::YANG;
                } else {
                    $transformed_hexagram[] = $line;
                }
            }
            return $transformed_hexagram;
        }
    }

    // Initialize caster and cast a hexagram
    $caster = new IChingCasterWithHexagramIdentification($pdo);
    $hexagram = $caster->generate_hexagram();

    // Display original hexagram details
    $hexagram_number = $caster->get_hexagram_number($hexagram);
    $hexagram_symbol = $caster->get_hexagram_symbol($hexagram);
    $hexagram_details = $caster->get_hexagram_details($hexagram);

    echo "<div class='container'>";
    echo "<h2>The Oracle's Response</h2>";
    echo "<ul class='responsive-table'>";
    echo "<li class='table-header'><div class='col col-1' style='text-align:center!important;'><h1><strong>Your question: </strong><br><br><em> " . $question . "</em></h1></div></li>";
    
    echo "<li class='table-header'><div class='col col-1' style='text-align:center!important;'><h1><strong>The Oracle Responds:</strong>";
    echo "<br>Hexagram {$hexagram_number}<br>";
    echo "<a style='font-size:4.2em'>{$hexagram_symbol}</a><br>";
    echo "<strong><em> " . htmlspecialchars($hexagram_details['english'] ?? 'Unknown', ENT_QUOTES, 'UTF-8') . " </strong></em><br>";
    echo "<p>" . htmlspecialchars($hexagram_details['wilhelm_symbolic'] ?? 'No symbolic description available.', ENT_QUOTES, 'UTF-8') . "</p>";

    // JUDGEMENT Parse wilhelm_judgment JSON
    $judgment_raw = str_replace("'", '"', $hexagram_details['wilhelm_judgment'] ?? '{}');
    $judgment = json_decode($judgment_raw, true);
    if ($judgment) {
        echo "<div class='comment-section'>";
        echo "<h3>The Oracle's Judgment</h3>";
        echo "<p>" . htmlspecialchars($judgment['text'] ?? 'No text available.', ENT_QUOTES, 'UTF-8') . "</p>";
        echo "<p><strong>Explanation:</strong> " . htmlspecialchars($judgment['comments'] ?? 'No comments available.', ENT_QUOTES, 'UTF-8') . "</p>";
        echo "</div>";
    } else {
        echo "<div class='comment-section'>";
        echo "<p><strong>Judgment:</strong> No judgment available.</p>";
        echo "</div>";
    }

    // IMAGE Parse wilhelm_image JSON
    $image_raw = str_replace("'", '"', $hexagram_details['wilhelm_image'] ?? '{}');
    $image = json_decode($image_raw, true);
    if ($image) {
        echo "<div class='comment-section'>";
        echo "<h3>The Image Presented</h3>";
        echo "<p>" . htmlspecialchars($image['text'] ?? 'No text available.', ENT_QUOTES, 'UTF-8') . "</p>";
        echo "<p><strong>Explanation:</strong> " . htmlspecialchars($image['comments'] ?? 'No comments available.', ENT_QUOTES, 'UTF-8') . "</p>";
        echo "</div>";
    } else {
        echo "<div class='comment-section'>";
        echo "<p><strong>Image:</strong> No image available.</p>";
        echo "</div>";
    }

    // Generate and display the transformed hexagram if there are changing lines
    $has_changing_lines = in_array(IChingCasterWithHexagramIdentification::CHANGING_YANG, $hexagram) ||
                          in_array(IChingCasterWithHexagramIdentification::CHANGING_YIN, $hexagram);

    if ($has_changing_lines) {
        $transformed_hexagram = $caster->generate_transformed_hexagram($hexagram);
        echo "<div class='comment-section'>";
        echo "<h3>The Future</h3>";
        echo "<p>The Oracle says that changes are ocurring, the path you are will most likely lead towards:</p>";

        $transformed_hexagram_number = $caster->get_hexagram_number($transformed_hexagram);
        $transformed_hexagram_symbol = $caster->get_hexagram_symbol($transformed_hexagram);
        $transformed_hexagram_details = $caster->get_hexagram_details($transformed_hexagram);

        echo "<h3>Hexagram: {$transformed_hexagram_number}</h3>\n";
        echo "<h1><span style='font-size:3.5em'>{$transformed_hexagram_symbol}</span></h1>\n";
        echo "<p><strong>Modern Name:</strong><br /> " . htmlspecialchars($transformed_hexagram_details['english'] ?? 'Unknown', ENT_QUOTES, 'UTF-8') . "<br>\n";
        echo "<strong><br />Symbolic Meaning:</strong><br /><br /> " . htmlspecialchars($transformed_hexagram_details['wilhelm_symbolic'] ?? 'No symbolic description available.', ENT_QUOTES, 'UTF-8') . "</p>\n";
        echo "</div>";
    }

    echo "</div></li>";

    echo "</ul></div>";
} else {
    // Display form if no question is asked
    echo "<html>
        <head>
            <link rel='stylesheet' href='iching.css' />
        </head>
        <body>
        <div class='container'>
          <ul class='responsive-table'>
                <li class='table-header'>
                 <div class='col col-1' style='text-align:center!important;'>
                     <h1><strong>Pose your question to the Oracle here: </strong></h1>
                           <form method='post' action=''>
                                <input type='text' id='question' name='question' placeholder='Write your question here.' required><br><br>
                                <input type='submit' value='Ask'>
                            </form>
                 </div>
                </li>
            </ul>

         </div>
        </body>
    </html>";
}
?>
<html>
    <head>
        <link rel="stylesheet" href="iching.css" />
    </head>
<body>
</body>
</html>
